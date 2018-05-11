import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/appstate.interface';
import * as actions from '../../store/player/player.actions';
import * as fromPlayer from '../../store/player/player.reducer';
import { OnInit } from '@angular/core';

@Component({
  selector: 'player-form',
  templateUrl: './player-form.component.html',
})
export class PlayerFormComponent implements OnInit {
  public model: fromPlayer.Player = {
    id: undefined,
    firstName: " ",
    lastName: " "
  }

  ngOnInit(): void {    
  }

  constructor(private store: Store<fromPlayer.State>) { }  

  save() {    
    this.store.dispatch(new actions.Create(this.model));  
    this.model = {
      id: undefined,
      firstName: "",
      lastName: ""
    };
  }
}