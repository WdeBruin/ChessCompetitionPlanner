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
import { tap } from 'rxjs/operators';

@Component({
    templateUrl: "competition-component.html",
    styleUrls: ['competition.component.css']
})
export class CompetitionComponent implements OnInit {
    public nextRoundId: number;
    public competitionId: number;
    public selectedRoundStandingId: number; 
    public players: Player[];

    public selectedCompetition$: Observable<Competition>;
    public selectedRound$: Observable<Round>;
    public rounds$: Observable<Round[]>;
    public selectedRoundStanding$: Observable<Standing>;
    public players$: Observable<Player[]>;

    constructor(private store: Store<IAppState>, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.store.dispatch(new competitionActions.Get());
        this.store.dispatch(new playerActions.GetPlayers());

        this.route.params.subscribe(params => {
            if (params.id) {
                this.store.dispatch(new roundActions.Get(params.id));                

                this.selectedCompetition$ = this.store.select(competitionSelector).select(s => s.data).select(s => s.find(c => c.id === params.id)).pipe(
                    tap(competition => this.competitionId = competition.id)
                );                
            }
        });

        this.rounds$ = this.store.select(roundSelector).select(s => s.data.filter(r => r.competitionId === this.competitionId)).pipe(
            tap(rounds => this.nextRoundId = rounds.length)
        );                

        this.players$ = this.store.select(playerSelector).select(p => p.data).pipe(
            tap(players => this.players = players)
        );
        
        this.selectedRound$ = this.store.select(roundSelector).select(s => s.data.find(r => r.isSelected));
        this.selectedRoundStanding$ = this.store.select(standingSelector).select(s => s.data.find(r => r.isSelected)).pipe(
            tap(standing => this.selectedRoundStandingId = standing.id)
        );
    }

    createRound(): void {
        // round create
        const round: Round = {
            id: this.nextRoundId,
            roundNumber: undefined,
            isSelected: true,
            playersInRoundIds: "",
            roundStatus: RoundStatus.PlayerSelect,
            competitionId: this.competitionId,
            playerVrijgeloot: undefined
        }
        this.store.dispatch(new roundActions.Create(round));

        // standings create
        const standing: Standing = {
            id: undefined,
            roundId: this.nextRoundId,
            competitionId: this.competitionId,
            isSelected: true
        }
        this.store.dispatch(new standingActions.Create(standing));

        // standings initial fill.
        this.fillStandings();
    }

    selectRound(roundId: number): void {
        // select round action -> new action
        // this.store.dispatch(new roundActions.Update(this.roundId, <Partial<Round>> {
        //     isSelected: true
        // }))
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
                standingId: this.selectedRoundStandingId,
                position: positionCounter
            }

            this.store.dispatch(new standingLineActions.Create(standingLine));
            positionCounter += 1;
        });

        // else take from last round
        // ...
    }
}