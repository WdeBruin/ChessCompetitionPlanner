import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate.interface';
import 'rxjs/add/operator/map';

import * as competitionActions from '../store/competition/competition.actions';
import * as roundActions from '../store/round/round.actions';
import * as fromPlayer from '../store/player/player.reducer';
import * as fromCompetition from '../store/competition/competition.reducer';
import * as fromRound from '../store/round/round.reducer';
import { Round } from 'src/app/store/round/round.interface';
import { RoundStatus } from 'src/app/store/round/round-status.enum';

@Component({
    templateUrl: "competition-component.html"
})
export class CompetitionComponent implements OnInit {
    public competitions$: Observable<fromCompetition.Competition[]>;    
    public rounds: Round[];
    public selectedCompetition: fromCompetition.Competition;

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.competitions$ = this.store.select(fromCompetition.selectAll);     
        this.competitions$.subscribe(c => 
            this.selectedCompetition =  c.find(x => x.isSelected) || undefined
        )
        this.store.select(fromRound.selectAll).subscribe(x => this.rounds = x.filter(f => f.competitionId == this.selectedCompetition.id));
    }

    createRound(): void {
        const round: Round = {            
            id: undefined,            
            roundNumber: undefined,
            isSelected: true,
            playersInRoundIds: [],            
            roundStatus: RoundStatus.PlayerSelect,
            competitionId: this.selectedCompetition.id,
        }

        this.store.dispatch(
            new roundActions.Create(round)
        )
    }

    selectRound(roundId: number): void {
        // select
    }
}