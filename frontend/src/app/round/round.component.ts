import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Normal } from 'distributions';

import * as playerActions from '../store/player/player.actions';
import * as standingLineActions from '../store/standing-line/standing-line.actions';
import * as roundActions from '../store/round/round.actions';
import * as gameActions from '../store/game/game.actions';
import { Player, Round, Competition, StandingLine, Game, RoundStatus, IAppState, playerSelector, competitionSelector, roundSelector, standingLineSelector, gameSelector } from '../store';
import { tap, map } from 'rxjs/operators';

@Component({
    selector: 'round-component',
    templateUrl: 'round.component.html',
    styleUrls: ['round.component.css']
})
export class RoundComponent implements OnInit {
    // Things for the logic in this component
    roundplayerKeys: string[] = [];
    competitonRounds: Round[];
    competition: Competition;
    standingLines: StandingLine[];
    games: Game[];
    allGamesOfCompetition: Game[];
    roundGames: Game[];
    players: Player[];

    // things for view disabling
    allgamesFinished: boolean;

    @Input()
    selectedRound: Round;

    public roundStatus = RoundStatus;
    // public displayedColumns = ["wit", "cpWit", "vs", "cpZwart", "zwart", "result"]
    public displayedColumns = ['wit', 'vs', 'zwart', 'result'];

    constructor(private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.store.dispatch(new standingLineActions.Get(this.selectedRound.competitionKey, this.selectedRound.roundNumber));
        this.store.dispatch(new gameActions.GetAll(this.selectedRound.competitionKey));

        this.store.select(playerSelector).pipe(
            map(p => p.data),
            tap(players => {
                players ? this.players = players.sort(function(a, b) {
                    const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
                    const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    // names must be equal
                    return 0;
                  }) : this.players = [];
            })
        ).subscribe();

        this.store.select(competitionSelector)
        .pipe(select(c => c.data),
            tap(competitions => this.competition = competitions.find(c => c.key == this.selectedRound.competitionKey))
        ).subscribe();

        this.store.select(roundSelector).pipe(select(r => r.data),
            tap(rounds => {
                if (this.selectedRound) {
                    if (this.selectedRound.playersInRoundIds.length > 0) {
                        this.roundplayerKeys = this.selectedRound.playersInRoundIds.split(',').map(x => x);
                    } else {
                        this.roundplayerKeys = [];
                    }
                }
                if (rounds && this.selectedRound) {
                    this.competitonRounds = rounds.filter(x => x.competitionKey == this.selectedRound.competitionKey);
                }
            })
        ).subscribe();

        this.store.select(standingLineSelector).pipe(select(s => s.data),
            tap(standingLines => {
                this.standingLines = standingLines.filter(x => x.competitionKey == this.selectedRound.competitionKey && x.roundNumber == this.selectedRound.roundNumber);
            })
        ).subscribe();

        this.store.select(gameSelector).pipe(select(g => g.data),
            tap(games => {
                this.games = games.filter(g => g.competitionKey == this.competition.key);
                this.roundGames = games.filter(g => g.competitionKey == this.competition.key && g.roundNumber == this.selectedRound.roundNumber);
            })
        ).subscribe();
    }

    processResult(game: Game, result: number) {
        const whitePlayer = this.players.find(x => x.key == game.whitePlayerKey);
        const whiteStandingLine = this.standingLines.find(x => x.playerKey == game.whitePlayerKey);
        const blackPlayer = this.players.find(x => x.key == game.blackPlayerKey);
        const blackStandingLine = this.standingLines.find(x => x.playerKey == game.blackPlayerKey);

        // If result is changed undo the old result.
        if (game.result != undefined && game.result != result) {
            // Update ELO and CP
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
        }

        // now only if result is new or changed, update stuff.
        if (game.result != result) {
            game.result = result;

            // Update ELO and CP
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
        let playersInRound = this.players.filter(p => this.roundplayerKeys.indexOf(p.key) !== -1);

        // Check if all those players have standinglines, if not, we add them. (Like when new player was added between rounds)
        // 14/9/2018 this was bug in round 1 when adding a player while in player select
        playersInRound.forEach(player => {
            console.log(player);
            if (!this.standingLines.find(x => x.playerKey === player.key)) {
                const standingLine: StandingLine = {
                    key: undefined,
                    competitionKey: this.selectedRound.competitionKey,
                    roundNumber: this.selectedRound.roundNumber,
                    playerKey: player.key,
                    competitionPoints: player.clubElo,
                };

                this.standingLines.push(standingLine);
                this.store.dispatch(new standingLineActions.Create(standingLine));
            }
        });

        // If necessary, remove one as "vrijgeloot" and save that to the round
        if (playersInRound.length % 2 == 1) {
            const vrijgeloot = this.vrijLoting(playersInRound);
            playersInRound = playersInRound.filter(p => p.key != vrijgeloot);
        }

        // find a match to create game with
        const playerIds = playersInRound.map(x => x.key);

        let standingLines = this.standingLines.filter(x => playerIds.indexOf(x.playerKey) !== -1);
        standingLines = this.sortStandingLines(standingLines);

        while (standingLines.length > 1) {
            const line = standingLines[0];

            // Find the closest player that this player didn't play yet, or the least amount of times.
            const candidates = standingLines.filter(x => x.playerKey != line.playerKey);
            let amountOfTimesPlayed = 0;
            let hasOpponent = false;
            let searchIndex = 0;

            while (!hasOpponent) {
                const candidate = candidates[searchIndex];
                // find amount of games between line.playerKey and candidate.
                const games = this.games.filter
                    (x => (x.whitePlayerKey == line.playerKey && x.blackPlayerKey == candidate.playerKey) ||
                        (x.blackPlayerKey == line.playerKey && x.whitePlayerKey == candidate.playerKey));
                if (games.length == amountOfTimesPlayed) {
                    this.makeGame(line.playerKey, candidate.playerKey); // make game and do elo calc etc.
                    // remove them from list
                    standingLines = standingLines.filter(x => x.playerKey != line.playerKey && x.playerKey != candidate.playerKey);
                    hasOpponent = true;
                }
                searchIndex += 1;
                if (searchIndex == candidates.length) {
                    searchIndex = 0;
                    amountOfTimesPlayed += 1;
                }
            }
        }

        // update state of round to generated
        this.selectedRound.roundStatus = this.roundStatus.Generated;
        this.store.dispatch(new roundActions.Update(this.selectedRound));
    }

    toggle(playerKey: string) {
        // here action for adding a player to the round
        const index = this.roundplayerKeys.indexOf(playerKey);

        if (index == -1) {
            this.roundplayerKeys.push(playerKey);
        } else {
            this.roundplayerKeys.splice(index, 1);
        }

        this.selectedRound.playersInRoundIds = this.roundplayerKeys.toString();

        // 14/9/18 Commented this after round 1 of the competition. Led to an annoying bug, we persist stuff in DB here that we don't want.
        // TODO: Refactor round component, make toggle screen a seperate component and have it use redux for persisting state when navigating away.
        // this.store.dispatch(new roundActions.Update(this.selectedRound));
    }

    private vrijLoting(playersInRound: Player[]): string {
        // Get playersinround that have not been vrijgeloot, or the least amount of times
        const lootbaar: string[] = [];
        let amountOfTimesFree = 0;
        const playersVrijgeloot = this.competitonRounds.map(x => x.playerVrijgeloot);

        while (lootbaar.length == 0) {
            playersInRound.forEach(p => {
                if (this.countOccurences(playersVrijgeloot, p.key) == amountOfTimesFree) {
                    lootbaar.push(p.key);
                }
            });

            amountOfTimesFree += 1;
        }

        const vrijgeloot = lootbaar[Math.floor(Math.random() * lootbaar.length)];
        this.selectedRound.playerVrijgeloot = vrijgeloot;
        this.store.dispatch(new roundActions.Update(this.selectedRound));

        return vrijgeloot;
    }

    private makeGame(player1: string, player2: string) {
        // calculate ELO and CP changes and store with game
        const game: Game = {
            key: undefined,
            competitionKey: this.competition.key,
            roundNumber: this.selectedRound.roundNumber,
            whitePlayerKey: undefined,
            blackPlayerKey: undefined,
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
        const player1Whites = this.games.filter(g => g.whitePlayerKey == player1).length;
        const player1Blacks = this.games.filter(g => g.blackPlayerKey == player1).length;
        const player1Diff = player1Whites - player1Blacks;
        const player2Whites = this.games.filter(g => g.whitePlayerKey == player2).length;
        const player2Blacks = this.games.filter(g => g.blackPlayerKey == player2).length;
        const player2Diff = player2Whites - player2Blacks;
        game.whitePlayerKey = player1Diff < player2Diff ? player1 : player2;
        game.blackPlayerKey = player1Diff < player2Diff ? player2 : player1;

        // Calculate ELO changes
        const normal = new Normal();
        const k = 30; // K factor

        const whitePlayer = this.players.find(p => p.key == game.whitePlayerKey);
        const blackPlayer = this.players.find(p => p.key == game.blackPlayerKey);
        // console.log(`white: ${whitePlayer.firstName.concat(' ').concat(whitePlayer.lastName)} - black: ${blackPlayer.firstName.concat(' ').concat(blackPlayer.lastName)}`)
        // for white
        const whiteEloDiff = whitePlayer.clubElo - blackPlayer.clubElo;
        const whiteZScore = whiteEloDiff / (200 * 10 / 7); // 200 * 10/7 is KNSB implementation of 200 * squareroot 2
        const whiteWinChance = normal.cdf(whiteZScore);
        game.whiteWinEloChange = k * (1 - whiteWinChance);
        game.whiteDrawEloChange = k * (0.5 - whiteWinChance);
        game.whiteLossEloChange = k * (0 - whiteWinChance);

        // for black
        const blackEloDiff = blackPlayer.clubElo - whitePlayer.clubElo;
        const blackZScore = blackEloDiff / (200 * 10 / 7); // 200 * 10/7 is KNSB implementation of 200 * squareroot 2
        const blackWinChance = normal.cdf(blackZScore);
        game.blackWinEloChange = k * (1 - blackWinChance);
        game.blackDrawEloChange = k * (0.5 - blackWinChance);
        game.blackLossEloChange = k * (0 - blackWinChance);
        // console.log(`winchance white: ${blackWinChance} - winchance black: ${blackWinChance}`)

        // Calculate CP changes. ELO change * 2 with limits on max / min.
        const winMax = 40;
        const winMin = 20;
        const lossMin = -20;
        const lossMax = -40;
        const drawMax = 10;
        const drawMin = -10;

        game.whiteWinCpChange = game.whiteWinEloChange * 2 > winMax ? winMax : game.whiteWinEloChange * 2 < winMin ? winMin : game.whiteWinEloChange * 2;
        game.whiteLossCpChange = game.whiteLossEloChange * 2 < lossMax ? lossMax : game.whiteLossEloChange * 2 > lossMin ? lossMin : game.whiteLossEloChange * 2;
        game.whiteDrawCpChange = game.whiteDrawEloChange * 2 > drawMax ? drawMax : game.whiteDrawEloChange * 2 < drawMin ? drawMin : game.whiteDrawEloChange * 2;

        game.blackWinCpChange = game.blackWinEloChange * 2 > winMax ? winMax : game.blackWinEloChange * 2 < winMin ? winMin : game.blackWinEloChange * 2;
        game.blackLossCpChange = game.blackLossEloChange * 2 < lossMax ? lossMax : game.blackLossEloChange * 2 > lossMin ? lossMin : game.blackLossEloChange * 2;
        game.blackDrawCpChange = game.blackDrawEloChange * 2 > drawMax ? drawMax : game.blackDrawEloChange * 2 < drawMin ? drawMin : game.blackDrawEloChange * 2;

        // create game
        this.store.dispatch(new gameActions.Create(game));
    }

    private countOccurences(arr: string[], keyToSearch: string): number {
        let count = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == keyToSearch) {
                count += 1;
            }
        }

        return count;
    }

    private sortStandingLines(list: StandingLine[]) {
        return list.sort((left, right): number => {
            if (left.competitionPoints < right.competitionPoints) { return 1; }
            if (left.competitionPoints > right.competitionPoints) { return -1; }
            return 0;
        });
    }

    public getName(playerKey: string): string {
        const player = this.players.find(x => x.key == playerKey);
        if (player) {
            return `${player.firstName} ${player.lastName}`;
        }
        return '';
    }

    public getResultDisplay(result: number): string {
        return result == 1 ? '1-0' : result == 0.5 ? '0,5-0,5' : result == 0 ? '0-1' : '-';
    }

    public finishRound() {
        this.selectedRound.roundStatus = RoundStatus.Done;
        this.store.dispatch(new roundActions.Update(this.selectedRound));
    }

    public currentRound(): Game[] {
        return this.games.filter(x => x.roundNumber == this.selectedRound.roundNumber && x.competitionKey == this.selectedRound.competitionKey);
    }

    public isPlayerSelected(key: string): boolean {
        return this.roundplayerKeys.indexOf(key) !== -1;
    }

    public allGamesFinished(): boolean {
        if (this.roundGames.length > 0 && this.roundGames.filter(x => x.result === null).length === 0) {
            return true;
        }
        return false;
    }

    public noGamesFinished(): boolean {
        if (this.roundGames.length > 0 && this.roundGames.filter(x => x.result === 1 || x.result === 0 || x.result === 0.5).length === 0) {
            return false;
        }
        return true;
    }

    public cancelRound(): void {
        this.roundGames.forEach((game) => {
            this.store.dispatch(new gameActions.Delete(game.key));
        });

        this.selectedRound.roundStatus = RoundStatus.PlayerSelect;
        this.store.dispatch(new roundActions.Update(this.selectedRound)) ;
    }
}
