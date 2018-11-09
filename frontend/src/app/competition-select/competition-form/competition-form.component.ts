import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Competition, IAppState } from '../../store';
import * as competitionActions from '../../store/competition/competition.actions';

@Component({
  selector: 'competition-form',
  templateUrl: './competition-form.component.html',
})
export class CompetitionFormComponent implements OnInit {
  public model: Competition = {
    key: undefined,
    isSelected: false,
    name: undefined,
    roundCount: 0
  };

  ngOnInit(): void {
  }

  constructor(private store: Store<IAppState>) { }

  save() {
    this.store.dispatch(new competitionActions.Create(this.model));
    this.model = {
      key: undefined,
      isSelected: false,
      name: undefined,
      roundCount: 0
    };
  }
}
