import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../store/appstate.interface';
import 'rxjs/add/operator/map';

import * as competitionActions from '../store/competition/competition.actions';
import * as roundActions from '../store/round/round.actions';
import * as standingActions from '../store/standing/standing.actions';
import * as standingLineActions from '../store/standing-line/standing-line.actions';
import * as fromPlayer from '../store/player/player.reducer';
import * as fromCompetition from '../store/competition/competition.reducer';
import * as fromRound from '../store/round/round.reducer';
import * as fromStanding from '../store/standing/standing.reducer';

import { Round } from '../store/round/round.interface';
import { RoundStatus } from '../store/round/round-status.enum';
import { Standing } from '../store/standing/standing.interface';
import { Player } from '../store/player/player.interface';
import { StandingLine } from '../store/standing-line/standing-line.interface';
import { Competition } from '../store/competition/competition.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: "competition-component.html",
    styleUrls: ['competition.component.css']
})
export class CompetitionComponent implements OnInit {
    public competitionId: number;

    public rounds: Round[];
    public selectedCompetition: Competition;
    public roundStanding: Standing | undefined;
    public roundId: number | undefined;
    public players: Player[];

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.competitionId = params.id;
                this.store.dispatch(new competitionActions.GetById(this.competitionId));
            }
        });

        this.store.select(fromCompetition.selectAll).subscribe(x => this.selectedCompetition = x.find(c => c.id == this.competitionId));
        this.store.select(fromRound.selectAll).subscribe(x => this.rounds = x.filter(f => f.competitionId == this.selectedCompetition.id));
        this.store.select(fromStanding.selectAll).subscribe(x => this.roundStanding = x.find(s => s.competitionId == this.selectedCompetition.id && s.roundId == this.roundId) || undefined)
        this.store.select(fromPlayer.selectAll).subscribe(x => this.players = x);
    }

    createRound(): void {

        
        this.roundId = this.rounds.length;

        // round create
        const round: Round = {
            id: this.roundId,
            roundNumber: undefined,
            isSelected: true,
            playersInRoundIds: [],
            roundStatus: RoundStatus.PlayerSelect,
            competitionId: this.selectedCompetition.id,
            playerVrijgeloot: undefined
        }
        this.store.dispatch(new roundActions.Create(round));

        // standings create
        const standing: Standing = {
            id: undefined,
            roundId: this.roundId,
            competitionId: this.selectedCompetition.id,
            isSelected: true
        }
        this.store.dispatch(new standingActions.Create(standing));

        // standings initial fill.
        this.fillStandings();
    }

    selectRound(roundId: number): void {
        // select
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
                standingId: this.roundStanding.id,
                position: positionCounter
            }

            this.store.dispatch(new standingLineActions.Create(standingLine));
            positionCounter += 1;
        });

        // else take from last round
        // ...
    }
}