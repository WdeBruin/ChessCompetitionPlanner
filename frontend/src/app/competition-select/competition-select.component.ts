import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private store: Store<IAppState>, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.competitions$ = this.store.select(competitionSelector);
  }

  ngOnInit() {
    this.authService.loginIfNotLoggedIn();
    this.store.dispatch(new competitionActions.Get());
  }

  navigate(key: string) {
    this.router.navigate(['competition', key], { relativeTo: this.route });
  }
}
