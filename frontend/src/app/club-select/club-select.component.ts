import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as clubActions from '../store/club/club.actions';
import * as competitionActions from './../store/competition/competition.actions';
import * as gameActions from './../store/game/game.actions';
import * as playerActions from './../store/player/player.actions';
import * as roundActions from './../store/round/round.actions';
import * as standingLineActions from './../store/standing-line/standing-line.actions';

import { IAppState, clubSelector, ClubState, Club } from '../store';
import { AuthService } from '../shared';
import { userSelector } from '../store/user';
import { User } from '../shared/user.model';

@Component({
  selector: 'club-select',
  templateUrl: './club-select.component.html',
  styleUrls: ['./club-select.component.css']
})
export class ClubSelectComponent implements OnInit {
  clubs$: Observable<ClubState>;
  user: User;
  addNew = false;

  constructor(private store: Store<IAppState>, private router: Router, private authService: AuthService, private zone: NgZone) {
    this.clubs$ = this.store.select(clubSelector);
    this.store.select(userSelector).subscribe(user => this.user = user.data);
  }

  ngOnInit() {
    this.store.dispatch(new playerActions.Reset());
    this.store.dispatch(new competitionActions.Reset());
    this.store.dispatch(new gameActions.Reset());
    this.store.dispatch(new roundActions.Reset());
    this.store.dispatch(new standingLineActions.Reset());

    this.store.dispatch(new clubActions.Get());
  }

  navigate(key: string) {
    this.router.navigate(['club', key]);
  }

  navigateNew() {
    this.zone.run(() => this.router.navigate(['club', 'new']));
  }

  filterMyClubs(clubs: Club[]) {
    return clubs.filter(x => x.adminEmails.indexOf(this.user.email) !== -1);
  }
}
