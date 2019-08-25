import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap, take } from 'rxjs/operators';
import {
  Competition, competitionSelector, IAppState, Player, playerSelector, Round, roundSelector, RoundStatus,
  StandingLine, standingLineSelector
} from '../store';
import * as competitionActions from '../store/competition/competition.actions';
import * as playerActions from '../store/player/player.actions';
import * as roundActions from '../store/round/round.actions';
import * as standingLineActions from '../store/standing-line/standing-line.actions';
import { AuthService } from '../shared';

@Component({
  templateUrl: 'competition.component.html'
})
export class CompetitionComponent implements OnInit {
  public players: Player[];
  public selectedCompetition: Competition | undefined;
  public rounds: Round[];
  public selectedRound: Round;
  public selectedClubKey: string;

  // things for view
  public roundsFinished: boolean; // only allow new round if rounds are finished

  constructor(private store: Store<IAppState>, private route: ActivatedRoute, private authService: AuthService) {
    this.route.params.subscribe(params => {
      this.selectedClubKey = params.clubKey;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new competitionActions.Get(this.selectedClubKey));
    this.store.dispatch(new playerActions.GetPlayers(this.selectedClubKey));

    this.route.params.subscribe(params => {
      if (params.competitionKey) {
        this.store.dispatch(new roundActions.Get(this.selectedClubKey, params.competitionKey));

        this.store.select(competitionSelector).pipe(
          map(s => s.data),
          tap(competitions => {
            this.selectedCompetition = competitions ? competitions.find(c => c.key === params.competitionKey) : undefined;
          })
        ).subscribe();
      }
    });

    this.store.select(roundSelector).pipe(
      map(s => s.data),
      tap(rounds => {
        if (rounds) {
          this.rounds = rounds.filter(r => r.competitionKey === this.selectedCompetition.key);
          this.selectedRound = this.rounds.find(r => r.isSelected) || this.rounds[rounds.length - 1]; // selected or last one.
          this.roundsFinished = this.rounds.filter(
            r => r.roundStatus === RoundStatus.Generated || r.roundStatus === RoundStatus.PlayerSelect).length === 0;
        }
      })
    ).subscribe();

    this.store.select(playerSelector).pipe(
      tap(players => {
        this.players = players.data;
      })
    ).subscribe();
  }

  createRound(): void {
    // round create
    const round: Round = {
      key: '',
      roundNumber: this.rounds.length + 1,
      isSelected: true,
      playersInRoundIds: '',
      roundStatus: RoundStatus.PlayerSelect,
      competitionKey: this.selectedCompetition ? this.selectedCompetition.key : undefined,
      playerVrijgeloot: null
    };
    this.selectedCompetition.key = round.competitionKey;
    this.store.dispatch(new roundActions.Create(round, this.selectedClubKey, round.competitionKey));

    this.selectRound(round);
    this.fillStandings(round.roundNumber, round.competitionKey);
  }

  selectRound(round: Round): void {
    this.selectedRound = round;

    this.rounds.forEach(r => {
      if (r.key === round.key) {
        r.isSelected = true;
        this.store.dispatch(new roundActions.Update(r, this.selectedClubKey, round.competitionKey));
      } else {
        if (r.isSelected) {
          r.isSelected = false;
          this.store.dispatch(new roundActions.Update(r, this.selectedClubKey, round.competitionKey));
        }
      }
    });
    // update rounds of competition: set everywhere selected to false except selected.
    // then in round component pipe for the round, and in the result do the rest.
  }

  fillStandings(roundNumber: number, competitionKey: string) {
    // if first round
    if (roundNumber === 1) {
      this.players = this.players.sort((a, b) => b.clubElo - a.clubElo);

      this.players.forEach(player => {
        const standingLine: StandingLine = {
          key: '',
          competitionKey: competitionKey,
          roundNumber: roundNumber,
          playerKey: player.key,
          points: 0,
          gamesPlayed: 0,
          percentage: 0,
          wp: 0,
          sb: 0
        };

        this.store.dispatch(new standingLineActions.Create(standingLine, this.selectedClubKey, competitionKey));
      });
    } else {
      // else copy standings from last round as our start point
      this.store.dispatch(new standingLineActions.Get(this.selectedClubKey, this.selectedCompetition.key, roundNumber - 1));

      this.store.select(standingLineSelector).pipe(
        map(s => s.data.filter(x => x.competitionKey === competitionKey
          && x.roundNumber === roundNumber - 1)),
        take(1),
        tap(standingLines => {
          this.players.forEach(player => {
            const oldStandingLine = standingLines.find(s => s.playerKey === player.key);

            if (oldStandingLine) {
              const newStandingLine: StandingLine = {
                key: '',
                competitionKey: competitionKey,
                roundNumber: roundNumber,
                playerKey: player.key,
                points: oldStandingLine.points,
                gamesPlayed: oldStandingLine.gamesPlayed,
                percentage: oldStandingLine.percentage,
                wp: oldStandingLine.wp,
                sb: oldStandingLine.sb
              };

              this.store.dispatch(new standingLineActions.Create(newStandingLine, this.selectedClubKey, competitionKey));
            }
          });
        })).subscribe();
    }
  }
}
