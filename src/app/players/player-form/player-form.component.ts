import { Component } from '@angular/core';
import { Player } from '../../shared/player';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/appstate.interface';
import * as playerActions from '../../store/players/players.actions';

@Component({
  selector: 'player-form',
  templateUrl: './player-form.component.html',
})
export class PlayerFormComponent {
  public model = new Player("", "");

  constructor(private store: Store<AppState>) { }

  save() {
    this.store.dispatch(new playerActions.AddPlayer(this.model));    
  }
}