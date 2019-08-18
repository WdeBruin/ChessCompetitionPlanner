import { User } from './../../shared/user.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Club, IAppState } from '../../store';
import * as clubActions from '../../store/club/club.actions';
import { Router } from '@angular/router';
import { userSelector } from 'src/app/store/user';

@Component({
  selector: 'club-form',
  templateUrl: './club-form.component.html',
})
export class ClubFormComponent implements OnInit {
  public model: Club = {
    key: '',
    name: undefined,
    adminEmails: []
  };

  private loggedInUser: User;

  ngOnInit(): void {
  }

  constructor(private store: Store<IAppState>, private router: Router) {
    store.select(userSelector).subscribe(user => this.loggedInUser = user.data);
  }

  save() {
    this.model.adminEmails.push(this.loggedInUser.email);
    this.store.dispatch(new clubActions.Create(this.model));
    this.model = {
      key: '',
      name: undefined,
      adminEmails: [this.loggedInUser.email]
    };

    this.router.navigate(['club']);
  }
}
