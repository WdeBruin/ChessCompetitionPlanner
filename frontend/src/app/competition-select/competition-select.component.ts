import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/appstate.interface';
import { Observable } from 'rxjs';
import { Competition } from '../store/competition/competition.interface';
import * as fromCompetition from '../store/competition/competition.reducer';
import * as competitionActions from '../store/competition/competition.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'competition-select',
  templateUrl: './competition-select.component.html',
  styleUrls: ['./competition-select.component.css']
})
export class CompetitionSelectComponent implements OnInit {
  competitions$: Observable<Competition[]>;
  addNew: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {
    this.competitions$ = this.store.select(fromCompetition.selectAll);
  }

  ngOnInit() {
    this.store.dispatch(new competitionActions.Get());
  }
  
  navigate(id: number) {
    this.router.navigate(['competition', id])
  }
}
