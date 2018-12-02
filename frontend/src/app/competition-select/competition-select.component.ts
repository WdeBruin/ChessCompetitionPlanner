import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as competitionActions from '../store/competition/competition.actions';

import { IAppState, competitionSelector, CompetitionState } from '../store';
import { AuthService } from '../shared';

@Component({
  selector: 'competition-select',
  templateUrl: './competition-select.component.html',
  styleUrls: ['./competition-select.component.css']
})
export class CompetitionSelectComponent implements OnInit {
  competitions$: Observable<CompetitionState>;
  addNew = false;

  constructor(private store: Store<IAppState>, private router: Router, private authService: AuthService) {
    this.competitions$ = this.store.select(competitionSelector);
  }

  ngOnInit() {
    this.authService.loginIfNotLoggedIn();
    this.store.dispatch(new competitionActions.Get());
  }

  navigate(id: number) {
    this.router.navigate(['competition', id]);
  }
}
