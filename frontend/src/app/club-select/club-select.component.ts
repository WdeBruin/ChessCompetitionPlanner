import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as clubActions from '../store/club/club.actions';

import { IAppState, clubSelector, ClubState } from '../store';
import { AuthService } from '../shared';

@Component({
  selector: 'club-select',
  templateUrl: './club-select.component.html',
  styleUrls: ['./club-select.component.css']
})
export class ClubSelectComponent implements OnInit {
  clubs$: Observable<ClubState>;
  addNew = false;

  constructor(private store: Store<IAppState>, private router: Router, private authService: AuthService) {
    this.clubs$ = this.store.select(clubSelector);
  }

  ngOnInit() {
    this.authService.loginIfNotLoggedIn();
    this.store.dispatch(new clubActions.Get());
  }

  navigate(key: string) {
    this.router.navigate(['club', key]);
  }
}
