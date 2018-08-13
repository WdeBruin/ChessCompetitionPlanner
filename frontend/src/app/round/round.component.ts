import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Normal } from 'distributions';

import * as playerActions from '../store/player/player.actions';
import * as standingActions from '../store/standing/standing.actions';
import * as standingLineActions from '../store/standing-line/standing-line.actions';
import * as roundActions from '../store/round/round.actions';
import * as gameActions from '../store/game/game.actions';
import { Player, Round, Competition, Standing, StandingLine, Game, RoundStatus, IAppState, playerSelector, competitionSelector, roundSelector, standingSelector, standingLineSelector, gameSelector } from '../store';
import { tap, withLatestFrom, map } from 'rxjs/operators';

@Component({
    selector: 'round-component',
    templateUrl: "round.component.html",
    styleUrls: ['round.component.css']
})
export class RoundComponent implements OnInit {
    // Things for the logic in this component
    roundplayerIds: number[] = [];
    competitonRounds: Round[];
    competition: Competition;
    standing: Standing;
    standingLines: StandingLine[];
    games: Game[];
    roundGames: Game[];
    players: Player[];

    @Input()
    selectedRound: Round;

    public roundStatus = RoundStatus;
    // public displayedColumns = ["wit", "cpWit", "vs", "cpZwart", "zwart", "result"]
    public displayedColumns = ["wit", "vs", "zwart", "result"]

    constructor(private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.store.dispatch(new standingActions.Get(this.selectedRound.competitionId, this.selectedRound.roundNumber));
        
        this.store.select(playerSelector).select(p => p.data).pipe(
            tap(players => {
                players ? this.players = players : this.players = []                
            })
        ).subscribe();

        this.store.select(competitionSelector).select(c => c.data).pipe(
            tap(competitions => this.competition = competitions.find(c => c.id == this.selectedRound.competitionId))
        ).subscribe();

        this.store.select(roundSelector).select(r => r.data).pipe(
            tap(rounds => {
                if (this.selectedRound && this.selectedRound.playersInRoundIds && this.selectedRound.playersInRoundIds.length > 0) {
                    this.roundplayerIds = this.selectedRound.playersInRoundIds.split(',').map(x => +x);
                }
                if (rounds && this.selectedRound) {
                    this.competitonRounds = rounds.filter(x => x.competitionId == this.selectedRound.competitionId);
                }
            })
        ).subscribe();
        
        this.store.select(standingSelector).select(s => s.data).pipe(
            tap(standings => {
                this.standing = standings.find(s => s.competitionId == this.selectedRound.competitionId && s.roundNumber == this.selectedRound.roundNumber)                                
                if(this.standing) {
                    this.store.dispatch(new standingLineActions.Get(this.standing.id));
                }                
            })
        ).subscribe();       

        this.store.select(standingLineSelector).select(s => s.data).pipe(
            tap(standingLines => {
                this.standingLines = this.standing ? standingLines.filter(x => x.standingId == this.standing.id) : undefined
            })
        ).subscribe();

        this.store.select(gameSelector).select(g => g.data).pipe(
            tap(games => {
                this.games = games.filter(g => g.competitionId == this.competition.id)
                this.roundGames = games.filter(g => g.competitionId == this.competition.id && g.roundNumber == this.selectedRound.roundNumber)
            })
        ).subscribe();
    }

    processResult(game: Game, result: number) {
        // If result is changed undo the old result.
        if (game.result != undefined && game.result != result) {
            // Update ELO and CP
            let whitePlayer = this.players.find(x => x.id == game.whitePlayerId);
            let whiteStandingLine = this.standingLines.find(x => x.playerId == game.whitePlayerId);
            let blackPlayer = this.players.find(x => x.id == game.blackPlayerId);
            let blackStandingLine = this.standingLines.find(x => x.playerId == game.blackPlayerId);

            switch (game.result) {
                case 1:
                    whitePlayer.clubElo = whitePlayer.clubElo - game.whiteWinEloChange;
                    whiteStandingLine.competitionPoints = whiteStandingLine.competitionPoints - game.whiteWinCpChange;
                    blackPlayer.clubElo = blackPlayer.clubElo - game.blackLossEloChange;
                    blackStandingLine.competitionPoints = blackStandingLine.competitionPoints - game.blackLossCpChange;
                    break;
                case 0.5:
                    whitePlayer.clubElo = whitePlayer.clubElo - game.whiteDrawEloChange;
                    whiteStandingLine.competitionPoints = whiteStandingLine.competitionPoints - game.whiteDrawCpChange;
                    blackPlayer.clubElo = blackPlayer.clubElo - game.blackDrawEloChange;
                    blackStandingLine.competitionPoints = blackStandingLine.competitionPoints - game.blackDrawCpChange;
                    break;
                case 0:
                    whitePlayer.clubElo = whitePlayer.clubElo - game.whiteLossEloChange;
                    whiteStandingLine.competitionPoints = whiteStandingLine.competitionPoints - game.whiteLossCpChange;
                    blackPlayer.clubElo = blackPlayer.clubElo - game.blackWinEloChange;
                    blackStandingLine.competitionPoints = blackStandingLine.competitionPoints - game.blackWinCpChange;
                    break;
            }

            this.store.dispatch(new playerActions.Update(whitePlayer));
            this.store.dispatch(new playerActions.Update(blackPlayer));
            this.store.dispatch(new standingLineActions.Update(whiteStandingLine));
            this.store.dispatch(new standingLineActions.Update(blackStandingLine));
        }

        // now only if result is new or changed, update stuff.
        if (game.result != result) {
            game.result = result;

            // Update ELO and CP
            let whitePlayer = this.players.find(x => x.id == game.whitePlayerId);
            let whiteStandingLine = this.standingLines.find(x => x.playerId == game.whitePlayerId);
            let blackPlayer = this.players.find(x => x.id == game.blackPlayerId);
            let blackStandingLine = this.standingLines.find(x => x.playerId == game.blackPlayerId);

            switch (game.result) {
                case 1:
                    whitePlayer.clubElo = whitePlayer.clubElo + game.whiteWinEloChange;
                    whiteStandingLine.competitionPoints = whiteStandingLine.competitionPoints + game.whiteWinCpChange;
                    blackPlayer.clubElo = blackPlayer.clubElo + game.blackLossEloChange;
                    blackStandingLine.competitionPoints = blackStandingLine.competitionPoints + game.blackLossCpChange;
                    break;
                case 0.5:
                    whitePlayer.clubElo = whitePlayer.clubElo + game.whiteDrawEloChange;
                    whiteStandingLine.competitionPoints = whiteStandingLine.competitionPoints + game.whiteDrawCpChange;
                    blackPlayer.clubElo = blackPlayer.clubElo + game.blackDrawEloChange;
                    blackStandingLine.competitionPoints = blackStandingLine.competitionPoints + game.blackDrawCpChange;
                    break;
                case 0:
                    whitePlayer.clubElo = whitePlayer.clubElo + game.whiteLossEloChange;
                    whiteStandingLine.competitionPoints = whiteStandingLine.competitionPoints + game.whiteLossCpChange;
                    blackPlayer.clubElo = blackPlayer.clubElo + game.blackWinEloChange;
                    blackStandingLine.competitionPoints = blackStandingLine.competitionPoints + game.blackWinCpChange;
                    break;
            }

            // Update state for both players, in competition and clubelo
            this.store.dispatch(new playerActions.Update(whitePlayer));
            this.store.dispatch(new playerActions.Update(blackPlayer));
            this.store.dispatch(new standingLineActions.Update(whiteStandingLine));
            this.store.dispatch(new standingLineActions.Update(blackStandingLine));
            this.store.dispatch(new gameActions.Update(game));
        }
    }

    generateGames(): void {
        // Get array of players that participate 
        let playersInRound = this.players.filter(p => this.roundplayerIds.indexOf(p.id) !== -1)

        // If necessary, remove one as "vrijgeloot" and save that to the round
        if (playersInRound.length % 2 == 1) {
            let vrijgeloot = this.vrijLoting(playersInRound);
            playersInRound = playersInRound.filter(p => p.id != vrijgeloot);
        }

        // find a match to create game with
        let playerIds = playersInRound.map(x => x.id);
        let standingLines = this.standingLines.filter(x => playerIds.indexOf(x.id) != -1);
        standingLines = this.sortStandingLines(standingLines);

        while (standingLines.length > 1) {
            let line = standingLines[0];

            // Find the closest player that this player didn't play yet, or the least amount of times.            
            let candidates = standingLines.filter(x => x.playerId != line.playerId);
            let amountOfTimesPlayed: number = 0;
            let hasOpponent: boolean = false;
            let searchIndex: number = 0;

            while (!hasOpponent) {
                let candidate = candidates[searchIndex];
                // find amount of games between line.playerId and candidate.
                let games = this.games.filter
                    (x => (x.whitePlayerId == line.playerId && x.blackPlayerId == candidate.id) ||
                        (x.blackPlayerId == line.playerId && x.whitePlayerId == candidate.id));
                if (games.length == amountOfTimesPlayed) {
                    this.makeGame(line.playerId, candidate.id); // make game and do elo calc etc.
                    // remove them from list                 
                    standingLines = standingLines.filter(x => x.id != line.playerId && x.id != candidate.playerId);
                    hasOpponent = true;
                }
                searchIndex += 1;
                if (searchIndex == candidates.length - 1) {
                    searchIndex = 0;
                    amountOfTimesPlayed += 1;
                }
            }
        }

        // update state of round to generated
        this.selectedRound.roundStatus = this.roundStatus.Generated;
        this.store.dispatch(new roundActions.Update(this.selectedRound));
    }

    toggle(playerId: number) {
        // here action for adding a player to the round
        let index = this.roundplayerIds.indexOf(playerId);

        if (index == -1)
            this.roundplayerIds.push(playerId);
        else
            this.roundplayerIds.splice(index, 1);

        this.selectedRound.playersInRoundIds = this.roundplayerIds.toString();
        this.store.dispatch(new roundActions.Update(this.selectedRound));
    }

    private vrijLoting(playersInRound: Player[]): number {
        // Get playersinround that have not been vrijgeloot, or the least amount of times
        let lootbaar: number[] = [];
        let amountOfTimesFree: number = 0;
        let playersVrijgeloot = this.competitonRounds.map(x => x.playerVrijgeloot);

        while (lootbaar.length == 0) {
            playersInRound.forEach(p => {
                if (this.countOccurences(playersVrijgeloot, p.id) == amountOfTimesFree)
                    lootbaar.push(p.id);
            })

            amountOfTimesFree += 1;
        }

        let vrijgeloot = lootbaar[Math.floor(Math.random() * lootbaar.length)];
        this.selectedRound.playerVrijgeloot = vrijgeloot;
        this.store.dispatch(new roundActions.Update(this.selectedRound));

        return vrijgeloot;
    }

    private makeGame(player1: number, player2: number) {
        // calculate ELO and CP changes and store with game        
        let game: Game = {
            id: undefined,
            competitionId: this.competition.id,
            roundNumber: this.selectedRound.roundNumber,
            whitePlayerId: undefined,
            blackPlayerId: undefined,
            result: undefined,
            whiteWinEloChange: undefined,
            whiteDrawEloChange: undefined,
            whiteLossEloChange: undefined,
            blackWinEloChange: undefined,
            blackDrawEloChange: undefined,
            blackLossEloChange: undefined,
            whiteWinCpChange: undefined,
            whiteDrawCpChange: undefined,
            whiteLossCpChange: undefined,
            blackWinCpChange: undefined,
            blackDrawCpChange: undefined,
            blackLossCpChange: undefined
        };

        // Decide white and black
        let player1Whites = this.games.filter(g => g.whitePlayerId == player1).length;
        let player1Blacks = this.games.filter(g => g.blackPlayerId == player1).length;
        let player1Diff = player1Whites - player1Blacks;
        let player2Whites = this.games.filter(g => g.whitePlayerId == player2).length;
        let player2Blacks = this.games.filter(g => g.blackPlayerId == player2).length;
        let player2Diff = player2Whites - player2Blacks;
        game.whitePlayerId = player1Diff < player2Diff ? player1 : player2;
        game.blackPlayerId = player1Diff < player2Diff ? player2 : player1;

        // Calculate ELO changes
        let normal = new Normal();
        let k = 30; // K factor

        let whitePlayer = this.players.find(p => p.id == game.whitePlayerId);
        let blackPlayer = this.players.find(p => p.id == game.blackPlayerId);
        //console.log(`white: ${whitePlayer.firstName.concat(' ').concat(whitePlayer.lastName)} - black: ${blackPlayer.firstName.concat(' ').concat(blackPlayer.lastName)}`)
        // for white
        let whiteEloDiff = whitePlayer.clubElo - blackPlayer.clubElo;
        let whiteZScore = whiteEloDiff / (200 * 10 / 7); // 200 * 10/7 is KNSB implementation of 200 * squareroot 2
        let whiteWinChance = normal.cdf(whiteZScore);
        game.whiteWinEloChange = k * (1 - whiteWinChance)
        game.whiteDrawEloChange = k * (0.5 - whiteWinChance)
        game.whiteLossEloChange = k * (0 - whiteWinChance)

        // for black
        let blackEloDiff = blackPlayer.clubElo - whitePlayer.clubElo;
        let blackZScore = blackEloDiff / (200 * 10 / 7); // 200 * 10/7 is KNSB implementation of 200 * squareroot 2
        let blackWinChance = normal.cdf(blackZScore);
        game.blackWinEloChange = k * (1 - blackWinChance)
        game.blackDrawEloChange = k * (0.5 - blackWinChance)
        game.blackLossEloChange = k * (0 - blackWinChance)
        //console.log(`winchance white: ${blackWinChance} - winchance black: ${blackWinChance}`)

        // Calculate CP changes. ELO change * 2 with limits on max / min.
        let winMax = 40;
        let winMin = 20;
        let lossMin = -20;
        let lossMax = -40;
        let drawMax = 10;
        let drawMin = -10;

        game.whiteWinCpChange = game.whiteWinEloChange * 2 > winMax ? winMax : game.whiteWinEloChange * 2 < winMin ? winMin : game.whiteWinEloChange * 2;
        game.whiteLossCpChange = game.whiteLossEloChange * 2 < lossMax ? lossMax : game.whiteLossEloChange * 2 > lossMin ? lossMin : game.whiteLossEloChange * 2;
        game.whiteDrawCpChange = game.whiteDrawEloChange * 2 > drawMax ? drawMax : game.whiteDrawEloChange * 2 < drawMin ? drawMin : game.whiteDrawEloChange * 2;

        game.blackWinCpChange = game.blackWinEloChange * 2 > winMax ? winMax : game.blackWinEloChange * 2 < winMin ? winMin : game.blackWinEloChange * 2;
        game.blackLossCpChange = game.blackLossEloChange * 2 < lossMax ? lossMax : game.blackLossEloChange * 2 > lossMin ? lossMin : game.blackLossEloChange * 2;
        game.blackDrawCpChange = game.blackDrawEloChange * 2 > drawMax ? drawMax : game.blackDrawEloChange * 2 < drawMin ? drawMin : game.blackDrawEloChange * 2;

        // create game
        this.store.dispatch(new gameActions.Create(game));
    }

    private countOccurences(arr: number[], idToSearch: number): number {
        let count = 0;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == idToSearch)
                count += 1;
        }

        return count;
    }

    private sortStandingLines(list: StandingLine[]) {
        return list.sort((left, right): number => {
            if (left.competitionPoints < right.competitionPoints) return 1;
            if (left.competitionPoints > right.competitionPoints) return -1;
            return 0;
        });
    }

    public getName(playerId: number): string {
        let player = this.players.find(x => x.id == playerId);
        return `${player.firstName} ${player.lastName}`;
    }

    public getResultDisplay(result: number): string {
        return result == 1 ? "1-0" : result == 0.5 ? "0,5-0,5" : result == 0 ? "0-1" : "-";
    }
}