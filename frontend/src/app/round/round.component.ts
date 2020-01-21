import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Normal } from 'distributions';
import { filter, map, tap } from 'rxjs/operators';
import {
  Competition,
  competitionSelector,
  Game,
  gameSelector,
  IAppState,
  Player,
  playerSelector,
  Round,
  roundSelector,
  RoundStatus,
  StandingLine,
  standingLineSelector
} from '../store';
import * as gameActions from '../store/game/game.actions';
import * as playerActions from '../store/player/player.actions';
import * as roundActions from '../store/round/round.actions';
import * as standingLineActions from '../store/standing-line/standing-line.actions';

@Component({
  selector: 'round-component',
  templateUrl: 'round.component.html'
})
export class RoundComponent implements OnInit {
  @Input()
  competitionKey: string;

  @Input()
  selectedClubKey: string;

  // Things for the logic in this component
  roundplayerKeys: string[] = [];
  competitonRounds: Round[] = [];
  competition: Competition = <Competition>{};
  standingLines: StandingLine[];
  competitionGames: Game[] = [];
  roundGames: Game[] = [];
  players: Player[] = [];
  selectedRound: Round = <Round>{};

  // things for view disabling
  allgamesFinished: boolean;
  addGame = false;

  // addgame form
  addGameForm: FormGroup;

  public roundStatus = RoundStatus;
  // public displayedColumns = ["wit", "cpWit", "vs", "cpZwart", "zwart", "result"]
  public displayedColumns = ['wit', 'vs', 'zwart', 'result'];

  constructor(private store: Store<IAppState>) {
    this.addGameForm = new FormGroup({
      player1: new FormControl(''),
      player2: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.store
      .select(roundSelector)
      .pipe(
        map(r =>
          r.data.filter(
            round =>
              round.isSelected && round.competitionKey === this.competitionKey
          )
        ),
        filter(activeRounds => activeRounds.length === 1),
        tap(round => {
          this.selectedRound = round[0];
          this.store.dispatch(
            new standingLineActions.Get(
              this.selectedClubKey,
              this.selectedRound.competitionKey,
              this.selectedRound.roundNumber
            )
          );
          this.store.dispatch(
            new gameActions.GetAll(
              this.selectedClubKey,
              this.selectedRound.competitionKey,
              this.selectedRound.key
            )
          );

          this.store
            .select(playerSelector)
            .pipe(
              map(p => p.data),
              tap(players => {
                players
                  ? (this.players = players.sort(function (a, b) {
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
                  }))
                  : (this.players = []);
              })
            )
            .subscribe();

          this.store
            .select(competitionSelector)
            .pipe(
              select(c => c.data),
              tap(
                competitions =>
                  (this.competition = competitions.find(
                    c => c.key === this.selectedRound.competitionKey
                  ))
              )
            )
            .subscribe();

          this.store
            .select(roundSelector)
            .pipe(
              select(r => r.data),
              tap(rounds => {
                if (this.selectedRound) {
                  if (this.selectedRound.playersInRoundIds.length > 0) {
                    this.roundplayerKeys = this.selectedRound.playersInRoundIds
                      .split(',')
                      .map(x => x);
                  } else {
                    this.roundplayerKeys = [];
                  }
                }
                if (rounds && this.selectedRound) {
                  this.competitonRounds = rounds.filter(
                    x => x.competitionKey === this.selectedRound.competitionKey
                  );
                }
              })
            )
            .subscribe();

          this.store
            .select(standingLineSelector)
            .pipe(
              select(s => s.data),
              tap(standingLines => {
                this.standingLines = standingLines.filter(
                  x =>
                    x.competitionKey === this.selectedRound.competitionKey &&
                    x.roundNumber === this.selectedRound.roundNumber
                );
              })
            )
            .subscribe();

          this.store
            .select(gameSelector)
            .pipe(
              select(g => g.data),
              tap(games => {
                this.competitionGames = games.filter(
                  g => g.competitionKey === this.competition.key
                );
                this.roundGames = games.filter(
                  g =>
                    g.competitionKey === this.competition.key &&
                    g.roundNumber === this.selectedRound.roundNumber
                );
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  processResult(game: Game, result: number) {
    if (this.selectedRound.roundStatus !== RoundStatus.Done) {
      game.result = result;
      this.store.dispatch(
        new gameActions.Update(
          game,
          this.selectedClubKey,
          this.competitionKey,
          this.selectedRound.key
        )
      );
    }
  }

  generateGames(): void {
    // Get array of players that participate
    let playersInRound = this.players.filter(
      p => this.roundplayerKeys.indexOf(p.key) !== -1
    );
    // If necessary, remove one as "vrijgeloot" and save that to the round
    if (playersInRound.length % 2 === 1) {
      const vrijgeloot = this.vrijLoting(playersInRound);
      playersInRound = playersInRound.filter(p => p.key !== vrijgeloot);
    }

    const playerIds = playersInRound.map(x => x.key);
    let standingLines = this.standingLines.filter(
      x => playerIds.indexOf(x.playerKey) !== -1
    );

    // Check if all those players have standinglines, if not, we add them. (Like when new player was added between rounds)
    playersInRound.forEach(player => {
      if (!this.standingLines.find(x => x.playerKey === player.key)) {
        const standingLine: StandingLine = {
          key: '',
          competitionKey: this.selectedRound.competitionKey,
          roundNumber: this.selectedRound.roundNumber,
          playerKey: player.key,
          points: 0,
          gamesPlayed: 0,
          win: 0,
          draw: 0,
          loss: 0,
          percentage: 0,
          wp: 0,
          sb: 0
        };

        standingLines.push(standingLine);
        this.store.dispatch(
          new standingLineActions.Create(
            standingLine,
            this.selectedClubKey,
            this.competitionKey
          )
        );
      }
    });

    // find a match to create game with
    standingLines = this.sortStandingLines(standingLines);

    while (standingLines.length > 1) {
      const line = standingLines[0];

      // Find the closest player that this player didn't play yet, or the least amount of times.
      const candidates = standingLines.filter(
        x => x.playerKey !== line.playerKey
      );
      let amountOfTimesPlayed = 0;
      let hasOpponent = false;
      let searchIndex = 0;

      while (!hasOpponent) {
        const candidate = candidates[searchIndex];
        // find amount of games between line.playerKey and candidate.
        const games = this.competitionGames.filter(
          x =>
            (x.whitePlayerKey === line.playerKey &&
              x.blackPlayerKey === candidate.playerKey) ||
            (x.blackPlayerKey === line.playerKey &&
              x.whitePlayerKey === candidate.playerKey)
        );
        if (games.length === amountOfTimesPlayed) {
          this.makeGame(line.playerKey, candidate.playerKey); // make game and do elo calc etc.
          // remove them from list
          standingLines = standingLines.filter(
            x =>
              x.playerKey !== line.playerKey &&
              x.playerKey !== candidate.playerKey
          );
          hasOpponent = true;
        }
        searchIndex += 1;
        if (searchIndex === candidates.length) {
          searchIndex = 0;
          amountOfTimesPlayed += 1;
        }
      }
    }

    // update state of round to generated
    this.selectedRound.roundStatus = this.roundStatus.Generated;
    this.store.dispatch(
      new roundActions.Update(
        this.selectedRound,
        this.selectedClubKey,
        this.competitionKey
      )
    );
  }

  toggle(playerKey: string) {
    // here action for adding a player to the round
    const index = this.roundplayerKeys.indexOf(playerKey);

    if (index === -1) {
      this.roundplayerKeys.push(playerKey);
    } else {
      this.roundplayerKeys.splice(index, 1);
    }

    this.selectedRound.playersInRoundIds = this.roundplayerKeys.toString();
    // 14/9/18 Commented this after round 1 of the competition. Led to an annoying bug, we persist stuff in DB here that we don't want.
    // TODO: Refactor round component, make toggle screen a seperate component and have it use
    // redux for persisting state when navigating away.
    // this.store.dispatch(new roundActions.Update(this.selectedRound));
  }

  addNewGame() {
    const player1key = this.addGameForm.controls['player1'].value;
    const player2key = this.addGameForm.controls['player2'].value;

    if (!this.standingLines.find(x => x.playerKey === player1key)) {
      const standingLine: StandingLine = {
        key: '',
        competitionKey: this.selectedRound.competitionKey,
        roundNumber: this.selectedRound.roundNumber,
        playerKey: player1key,
        points: 0,
        gamesPlayed: 0,
        win: 0,
        draw: 0,
        loss: 0,
        percentage: 0,
        wp: 0,
        sb: 0
      };

      this.standingLines.push(standingLine);
      this.store.dispatch(
        new standingLineActions.Create(
          standingLine,
          this.selectedClubKey,
          this.competitionKey
        )
      );
    }

    if (!this.standingLines.find(x => x.playerKey === player2key)) {
      const standingLine: StandingLine = {
        key: '',
        competitionKey: this.selectedRound.competitionKey,
        roundNumber: this.selectedRound.roundNumber,
        playerKey: player2key,
        points: 0,
        gamesPlayed: 0,
        win: 0,
        draw: 0,
        loss: 0,
        percentage: 0,
        wp: 0,
        sb: 0
      };

      this.standingLines.push(standingLine);
      this.store.dispatch(
        new standingLineActions.Create(
          standingLine,
          this.selectedClubKey,
          this.competitionKey
        )
      );
    }

    this.makeGame(player1key, player2key);
    this.addGame = false;
  }

  notAddedPlayers() {
    return this.players.filter(
      player =>
        !this.roundGames.find(
          g =>
            g.whitePlayerKey === player.key || g.blackPlayerKey === player.key
        )
    );
  }

  private vrijLoting(playersInRound: Player[]): string {
    // Get playersinround that have not been vrijgeloot, or the least amount of times
    const lootbaar: string[] = [];
    let amountOfTimesFree = 0;
    const playersVrijgeloot = this.competitonRounds.map(
      x => x.playerVrijgeloot
    );

    while (lootbaar.length === 0) {
      playersInRound.forEach(p => {
        if (
          this.countOccurences(playersVrijgeloot, p.key) === amountOfTimesFree
        ) {
          lootbaar.push(p.key);
        }
      });

      amountOfTimesFree += 1;
    }

    const vrijgeloot = lootbaar[Math.floor(Math.random() * lootbaar.length)];
    this.selectedRound.playerVrijgeloot = vrijgeloot;
    this.store.dispatch(
      new roundActions.Update(
        this.selectedRound,
        this.selectedClubKey,
        this.competitionKey
      )
    );

    return vrijgeloot;
  }

  private makeGame(player1: string, player2: string) {
    // calculate ELO and CP changes and store with game
    const game: Game = {
      key: '',
      competitionKey: this.competition.key,
      roundNumber: this.selectedRound.roundNumber,
      whitePlayerKey: null,
      blackPlayerKey: null,
      result: null,
      whiteWinEloChange: null,
      whiteDrawEloChange: null,
      whiteLossEloChange: null,
      blackWinEloChange: null,
      blackDrawEloChange: null,
      blackLossEloChange: null
    };

    // Decide white and black
    const player1Whites = this.competitionGames.filter(
      g => g.whitePlayerKey === player1
    ).length;
    const player1Blacks = this.competitionGames.filter(
      g => g.blackPlayerKey === player1
    ).length;
    const player1Diff = player1Whites - player1Blacks;
    const player2Whites = this.competitionGames.filter(
      g => g.whitePlayerKey === player2
    ).length;
    const player2Blacks = this.competitionGames.filter(
      g => g.blackPlayerKey === player2
    ).length;
    const player2Diff = player2Whites - player2Blacks;
    game.whitePlayerKey = player1Diff < player2Diff ? player1 : player2;
    game.blackPlayerKey = player1Diff < player2Diff ? player2 : player1;

    // Calculate ELO changes
    const normal = new Normal();
    const k = 30; // K factor

    const whitePlayer = this.players.find(p => p.key === game.whitePlayerKey);
    const blackPlayer = this.players.find(p => p.key === game.blackPlayerKey);
    // for white
    const whiteEloDiff = +whitePlayer.clubElo - +blackPlayer.clubElo;
    const whiteZScore = +whiteEloDiff / ((200 * 10) / 7); // 200 * 10/7 is KNSB implementation of 200 * squareroot 2
    const whiteWinChance = normal.cdf(whiteZScore);
    game.whiteWinEloChange = k * (1 - whiteWinChance);
    game.whiteDrawEloChange = k * (0.5 - whiteWinChance);
    game.whiteLossEloChange = k * (0 - whiteWinChance);

    // for black
    const blackEloDiff = +blackPlayer.clubElo - +whitePlayer.clubElo;
    const blackZScore = +blackEloDiff / ((200 * 10) / 7); // 200 * 10/7 is KNSB implementation of 200 * squareroot 2
    const blackWinChance = normal.cdf(blackZScore);
    game.blackWinEloChange = k * (1 - blackWinChance);
    game.blackDrawEloChange = k * (0.5 - blackWinChance);
    game.blackLossEloChange = k * (0 - blackWinChance);

    // create game
    this.store.dispatch(
      new gameActions.Create(
        game,
        this.selectedClubKey,
        this.competitionKey,
        this.selectedRound.key
      )
    );
  }

  private countOccurences(arr: string[], keyToSearch: string): number {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === keyToSearch) {
        count += 1;
      }
    }

    return count;
  }

  private sortStandingLines(list: StandingLine[]) {
    return list.sort((left, right): number => {
      if (+left.percentage < +right.percentage) {
        return 1;
      }
      if (+left.percentage > +right.percentage) {
        return -1;
      }
      return 0;
    });
  }

  public getName(playerKey: string): string {
    const player = this.players.find(x => x.key === playerKey);
    if (player) {
      return `${player.firstName} ${player.lastName}`;
    }
    return '';
  }

  public getResultDisplay(result: number): string {
    return result === 1
      ? '1-0'
      : result === 0.5
        ? '0,5-0,5'
        : result === 0
          ? '0-1'
          : '-';
  }

  public finishRound() {
    this.selectedRound.roundStatus = RoundStatus.Done;

    // Process standing for each game and elo change.
    this.roundGames.forEach(game => {
      const whitePlayer = this.players.find(x => x.key === game.whitePlayerKey);
      const blackPlayer = this.players.find(x => x.key === game.blackPlayerKey);
      const whiteStandingLine = this.standingLines.find(
        x => x.playerKey === game.whitePlayerKey
      );
      const blackStandingLine = this.standingLines.find(
        x => x.playerKey === game.blackPlayerKey
      );

      whiteStandingLine.gamesPlayed += 1;
      blackStandingLine.gamesPlayed += 1;

      switch (game.result) {
        case 1:
          whitePlayer.clubElo = +whitePlayer.clubElo + +game.whiteWinEloChange;
          blackPlayer.clubElo = +blackPlayer.clubElo + +game.blackLossEloChange;
          whiteStandingLine.points += 1;
          whiteStandingLine.win += 1;
          blackStandingLine.loss += 1;
          break;
        case 0.5:
          whitePlayer.clubElo = +whitePlayer.clubElo + +game.whiteDrawEloChange;
          blackPlayer.clubElo = +blackPlayer.clubElo + +game.blackDrawEloChange;
          whiteStandingLine.points += 0.5;
          blackStandingLine.points += 0.5;
          whiteStandingLine.draw += 1;
          blackStandingLine.draw += 1;
          break;
        case 0:
          whitePlayer.clubElo = +whitePlayer.clubElo + +game.whiteLossEloChange;
          blackPlayer.clubElo = +blackPlayer.clubElo + +game.blackWinEloChange;
          blackStandingLine.points += 1;
          whiteStandingLine.loss += 1;
          blackStandingLine.win += 1;
          break;
      }

      whiteStandingLine.percentage =
        (whiteStandingLine.points / whiteStandingLine.gamesPlayed) * 100;
      blackStandingLine.percentage =
        (blackStandingLine.points / blackStandingLine.gamesPlayed) * 100;

      // save changes
      this.store.dispatch(
        new playerActions.Update(whitePlayer, this.selectedClubKey)
      );
      this.store.dispatch(
        new playerActions.Update(blackPlayer, this.selectedClubKey)
      );
      this.store.dispatch(
        new standingLineActions.Update(
          whiteStandingLine,
          this.selectedClubKey,
          this.competitionKey
        )
      );
      this.store.dispatch(
        new standingLineActions.Update(
          blackStandingLine,
          this.selectedClubKey,
          this.competitionKey
        )
      );
    });

    // After stand is processed.
    // calculate WP: total points of all opponents player played.
    // calculate SB: Not yet. What if you play someone twice? Difficult to determine whether it counts then..
    this.standingLines.forEach(line => {
      line.wp = 0;
      const whiteGames = this.competitionGames.filter(
        x => x.whitePlayerKey === line.playerKey
      );
      const blackGames = this.competitionGames.filter(
        x => x.blackPlayerKey === line.playerKey
      );

      const opponents: string[] = whiteGames
        .map(game => game.blackPlayerKey)
        .concat(blackGames.map(game => game.whitePlayerKey));
      opponents.forEach(opponent => {
        const opponentStandingLine = this.standingLines.find(
          x => x.playerKey === opponent
        );
        if (opponentStandingLine !== undefined) {
          line.wp += opponentStandingLine.points;
        }
      });
      this.store.dispatch(
        new standingLineActions.Update(
          line,
          this.selectedClubKey,
          this.competitionKey
        )
      );
    });

    this.store.dispatch(
      new roundActions.Update(
        this.selectedRound,
        this.selectedClubKey,
        this.competitionKey
      )
    );
  }

  public currentRound(): Game[] {
    return this.competitionGames.filter(
      x =>
        x.roundNumber === this.selectedRound.roundNumber &&
        x.competitionKey === this.selectedRound.competitionKey
    );
  }

  public isPlayerSelected(key: string): boolean {
    return this.roundplayerKeys.indexOf(key) !== -1;
  }

  public allGamesFinished(): boolean {
    if (
      this.roundGames.length > 0 &&
      this.roundGames.filter(x => x.result === null || x.result === undefined)
        .length === 0
    ) {
      return true;
    }
    return false;
  }

  public noGamesFinished(): boolean {
    if (
      this.roundGames.length > 0 &&
      this.roundGames.filter(
        x => x.result === 1 || x.result === 0 || x.result === 0.5
      ).length === 0
    ) {
      return false;
    }
    return true;
  }

  public cancelRound(): void {
    this.roundGames.forEach(game => {
      this.store.dispatch(
        new gameActions.Delete(
          game.key,
          this.selectedClubKey,
          this.competitionKey,
          this.selectedRound.key
        )
      );
    });

    this.selectedRound.roundStatus = RoundStatus.PlayerSelect;
    this.selectedRound.playerVrijgeloot = null;
    this.store.dispatch(
      new roundActions.Update(
        this.selectedRound,
        this.selectedClubKey,
        this.competitionKey
      )
    );
  }
}
