import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Club, IAppState } from '../../store';
import * as clubActions from '../../store/club/club.actions';

@Component({
  selector: 'club-form',
  templateUrl: './club-form.component.html',
})
export class ClubFormComponent implements OnInit {
  public model: Club = {
    key: '',
    name: undefined,
  };

  ngOnInit(): void {
  }

  constructor(private store: Store<IAppState>) { }

  save() {
    this.store.dispatch(new clubActions.Create(this.model));
    this.model = {
      key: '',
      name: undefined,
    };
  }
}
