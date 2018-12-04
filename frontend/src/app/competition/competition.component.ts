import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap, filter, take } from 'rxjs/operators';
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
    templateUrl: 'competition.component.html',
    styleUrls: ['competition.component.css']
})
export class CompetitionComponent implements OnInit {
    public players: Player[];
    public selectedCompetition: Competition | undefined;
    public rounds: Round[];
    public selectedRound: Round;

    // things for view
    public roundsFinished: boolean; // only allow new round if rounds are finished

    constructor(private store: Store<IAppState>, private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.loginIfNotLoggedIn();
        this.store.dispatch(new competitionActions.Get());
        this.store.dispatch(new playerActions.GetPlayers());

        this.route.params.subscribe(params => {
            if (params.key) {
                this.store.dispatch(new roundActions.Get(params.key));

                this.store.select(competitionSelector).pipe(
                    map(s => s.data),
                    tap(competitions => {
                        this.selectedCompetition = competitions ? competitions.find(c => c.key === params.key) : undefined;
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
        this.store.dispatch(new roundActions.Create(round));

        this.selectRound(round);
        this.fillStandings(round.roundNumber, round.competitionKey);
    }

    selectRound(round: Round): void {
        this.selectedRound = round;

        this.rounds.forEach(r => {
            if (r.key === round.key) {
                r.isSelected = true;
                this.store.dispatch(new roundActions.Update(r));
            } else {
                if (r.isSelected) {
                    r.isSelected = false;
                    this.store.dispatch(new roundActions.Update(r));
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
                    competitionPoints: player.clubElo,
                };

                this.store.dispatch(new standingLineActions.Create(standingLine));
            });
        } else {
            // else copy standings from last round as our start point
            this.store.dispatch(new standingLineActions.Get(this.selectedCompetition.key, roundNumber - 1));

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
                                competitionPoints: oldStandingLine.competitionPoints
                            };

                            this.store.dispatch(new standingLineActions.Create(newStandingLine));
                        }
                    });
                })).subscribe();
        }
    }
}
