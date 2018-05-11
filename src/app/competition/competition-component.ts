import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { PlayerState } from '../store/players/player.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate.interface';
import 'rxjs/add/operator/map';
import { MatSelectionList } from '@angular/material';
import { CompetitionState } from 'src/app/store/competitions/competition.interface';
import { RoundState } from 'src/app/store/rounds/round.interface';

@Component({
    templateUrl: "competition-component.html"
})
export class CompetitionComponent implements OnInit {
    public competitions$: Observable<CompetitionState[]>;
    public selectedCompetition: CompetitionState;

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        // this.competitions$ = this.store.select(s => s.competitions);     
        // this.competitions$.subscribe(c => 
        //     this.selectedCompetition =  c.find(x => x.isSelected) || undefined
        // )
    }

    selectRound(round: RoundState): void {
        //this.selectedRound = round;
    }
}