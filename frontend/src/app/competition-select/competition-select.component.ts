import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as competitionActions from '../store/competition/competition.actions';

import { Competition, IAppState, competitionSelector } from '../store';

@Component({
  selector: 'competition-select',
  templateUrl: './competition-select.component.html',
  styleUrls: ['./competition-select.component.css']
})
export class CompetitionSelectComponent implements OnInit {
  competitions$: Observable<Competition[]>;
  addNew: boolean = false;

  constructor(private store: Store<IAppState>, private router: Router) {
    this.competitions$ = this.store.select(competitionSelector).select(c => c.data);
  }

  ngOnInit() {
    this.store.dispatch(new competitionActions.Get());
  }
  
  navigate(id: number) {
    this.router.navigate(['competition', id])
  }
}
