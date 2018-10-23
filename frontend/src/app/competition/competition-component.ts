import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Round, Player, IAppState, roundSelector, Competition, competitionSelector, playerSelector, RoundStatus, StandingLine, standingLineSelector } from '../store';
import * as playerActions from '../store/player/player.actions';
import * as competitionActions from '../store/competition/competition.actions';
import * as roundActions from '../store/round/round.actions';
import * as standingLineActions from '../store/standing-line/standing-line.actions';
import * as gameActions from '../store/game/game.actions';
import { tap, filter, take } from 'rxjs/operators';

@Component({
    templateUrl: "competition-component.html",
    styleUrls: ['competition.component.css']
})
export class CompetitionComponent implements OnInit {
    public players: Player[];
    public selectedCompetition: Competition | undefined;
    public rounds: Round[];
    public selectedRound: Round;

    // things for view
    public roundsFinished: boolean; // only allow new round if rounds are finished

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
                        this.rounds = rounds.filter(r => r.competitionId === this.selectedCompetition.id);
                        this.selectedRound = this.rounds.find(r => r.isSelected) || this.rounds[rounds.length - 1]; // selected or last one.                        

                        this.roundsFinished = rounds.filter(r => r.roundStatus === RoundStatus.Generated || r.roundStatus === RoundStatus.PlayerSelect).length === 0;
                    }
                })
            ).subscribe();

        this.store.select(playerSelector).pipe(
            tap(players => {
                this.players = players.data
                //console.log(this.players);
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

        // Give standing line a roundNumber and CompetitionId and delete Standing as a model, clears up things.
        this.selectedRound = round;
        this.fillStandings(); 
    }

    selectRound(round: Round): void {
        this.selectedRound = round;        
    }

    fillStandings() {
        //console.log(`competitionId: ${this.selectedCompetition.id} roundId: ${this.roundId} standingId: ${this.roundStanding.id}`);
        // if first round
        if (this.selectedRound.roundNumber == 1) {
            this.players = this.players.sort((a,b) => b.clubElo - a.clubElo);
            let positionCounter = 1; // positioncounter obsolete

            this.players.forEach(player => {
                const standingLine: StandingLine = {
                    id: undefined,
                    competitionId: this.selectedRound.competitionId,
                    roundNumber: this.selectedRound.roundNumber,
                    playerId: player.id,
                    competitionPoints: player.clubElo,
                    position: positionCounter // obsolete field
                }
    
                this.store.dispatch(new standingLineActions.Create(standingLine));
                positionCounter += 1; // positioncounter obsolete
            });
        } else {
            // else copy standings from last round as our start point
            this.store.dispatch(new standingLineActions.Get(this.selectedCompetition.id, this.selectedRound.roundNumber - 1));

            this.store.select(standingLineSelector).select(s => s.data).pipe(
                take(1),
                tap(standingLines => {
                    this.players.forEach(player => {
                        const oldStandingLine = standingLines.find(s => s.playerId === player.id);

                        const newStandingLine: StandingLine = {
                            id: undefined,
                            competitionId: this.selectedRound.competitionId,
                            roundNumber: this.selectedRound.roundNumber,
                            playerId: player.id,
                            competitionPoints: oldStandingLine.competitionPoints,
                            position: oldStandingLine.position
                        }

                        this.store.dispatch(new standingLineActions.Create(newStandingLine));
                    })
                })
            ).subscribe();
        }          
    }
}