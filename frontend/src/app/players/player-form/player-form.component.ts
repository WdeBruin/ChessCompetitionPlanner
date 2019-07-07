import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as playerActions from '../../store/player/player.actions';
import { Player, IAppState } from '../../store';

@Component({
  selector: 'player-form',
  templateUrl: './player-form.component.html',
})
export class PlayerFormComponent implements OnInit {
  @Input()
  selectedClubKey: string;

  public model: Player = {
    key: '',
    firstName: '',
    lastName: '',
    clubElo: 100
  };

  ngOnInit(): void {
  }

  constructor(private store: Store<IAppState>) { }

  save() {
    this.store.dispatch(new playerActions.Create(this.model, this.selectedClubKey));
    this.model = {
      key: '',
      firstName: '',
      lastName: '',
      clubElo: 100
    };
  }
}
