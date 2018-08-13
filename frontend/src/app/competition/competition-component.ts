import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Round, Standing, Player, IAppState, roundSelector, Competition, competitionSelector, playerSelector, standingSelector, RoundStatus, StandingLine } from '../store';
import * as playerActions from '../store/player/player.actions';
import * as competitionActions from '../store/competition/competition.actions';
import * as roundActions from '../store/round/round.actions';
import * as standingActions from '../store/standing/standing.actions';
import * as standingLineActions from '../store/standing-line/standing-line.actions';
import { tap, filter } from 'rxjs/operators';

@Component({
    templateUrl: "competition-component.html",
    styleUrls: ['competition.component.css']
})
export class CompetitionComponent implements OnInit {
    public players: Player[];
    public selectedCompetition: Competition | undefined;
    public rounds: Round[];
    public selectedRound: Round;
    public selectedRoundStanding: Standing;

    constructor(private store: Store<IAppState>, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.store.dispatch(new competitionActions.Get());
        this.store.dispatch(new playerActions.GetPlayers());

        this.route.params.subscribe(params => {
            if (params.id) {
                this.store.dispatch(new roundActions.Get(params.id));

                this.store.select(competitionSelector).select(s => s.data).pipe(
                    tap(competitions => {
                        this.selectedCompetition = competitions ? competitions.find(c => c.id === +params.id) : undefined
                        // console.log(params.id);
                    })
                ).subscribe();
            }
        });

        this.store.select(roundSelector).select(s => s.data)
            .pipe(
                tap(rounds => {
                    if (rounds) {
                        this.rounds = rounds.filter(r => this.selectedCompetition ? r.competitionId === this.selectedCompetition.id : false);
                        this.selectedRound = this.rounds.find(r => r.isSelected) || this.rounds[rounds.length - 1]; // selected or last one.                        
                    }
                })
            ).subscribe();

        this.store.select(playerSelector).pipe(
            tap(players => {
                this.players = players.data
                //console.log(this.players);
            })
        ).subscribe();

        this.store.select(standingSelector).select(s => s ? s.data : undefined).pipe(
            tap(standings => {
                this.selectedRoundStanding = standings ? standings.find(s => s.isSelected) : undefined;                
            })
        ).subscribe();
    }

    createRound(): void {
        // round create
        const round: Round = {
            id: undefined,
            roundNumber: this.rounds.length + 1,
            isSelected: true,
            playersInRoundIds: "",
            roundStatus: RoundStatus.PlayerSelect,
            competitionId: this.selectedCompetition ? this.selectedCompetition.id : undefined,
            playerVrijgeloot: undefined
        }
        this.store.dispatch(new roundActions.Create(round));

        // standings create
        const standing: Standing = {
            id: undefined,
            roundNumber: round.roundNumber,
            competitionId: this.selectedCompetition ? this.selectedCompetition.id : undefined,
            isSelected: true
        }
        this.store.dispatch(new standingActions.Create(standing));       

        // Give standing line a roundNumber and CompetitionId and delete Standing as a model, clears up things.
        this.fillStandings(); 
    }

    selectRound(round: Round): void {
        this.selectedRound = round;        
    }

    fillStandings() {
        //console.log(`competitionId: ${this.selectedCompetition.id} roundId: ${this.roundId} standingId: ${this.roundStanding.id}`);
        // if first round
        this.players = this.players.sort(x => x.clubElo).reverse();
        let positionCounter = 1;

        this.players.forEach(player => {
            const standingLine: StandingLine = {
                id: undefined,
                playerId: player.id,
                competitionPoints: player.clubElo,
                standingId: this.selectedRoundStanding ? this.selectedRoundStanding.id : undefined,
                position: positionCounter
            }

            this.store.dispatch(new standingLineActions.Create(standingLine));
            positionCounter += 1;
        });

        // else take from last round
        // ...
    }
}