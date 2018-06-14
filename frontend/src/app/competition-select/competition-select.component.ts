import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/appstate.interface';
import { Observable } from 'rxjs';
import { Competition } from '../store/competition/competition.interface';
import * as fromCompetition from '../store/competition/competition.reducer';

@Component({
  selector: 'competition-select',
  templateUrl: './competition-select.component.html',
  styleUrls: ['./competition-select.component.css']
})
export class CompetitionSelectComponent implements OnInit {
  competitions$: Observable<Competition[]>;
  addNew: boolean = false;

  constructor(private store: Store<AppState>) { 
    this.competitions$ = this.store.select(fromCompetition.selectAll);
  }

  ngOnInit() {
    // load action.
  }
}
