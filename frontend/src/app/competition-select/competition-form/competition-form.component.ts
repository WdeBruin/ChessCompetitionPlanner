import { ActivatedRoute } from '@angular/router';
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
    key: '',
    isSelected: false,
    name: undefined,
    roundCount: 0
  };
  private clubKey: string;

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.clubKey) {
        this.clubKey = params.clubKey;
      }
    })
  }

  save() {
    this.store.dispatch(new competitionActions.Create(this.model, this.clubKey));
    this.model = {
      key: '',
      isSelected: false,
      name: undefined,
      roundCount: 0
    };
  }
}
