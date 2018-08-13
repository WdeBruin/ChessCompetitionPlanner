import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as playerActions from '../../store/player/player.actions';
import { Player, IAppState } from '../../store';

@Component({
  selector: 'player-form',
  templateUrl: './player-form.component.html',
})
export class PlayerFormComponent implements OnInit {
  public model: Player = {
    id: undefined,
    firstName: "",
    lastName: "",
    clubElo: 100
  }

  ngOnInit(): void {    
  }

  constructor(private store: Store<IAppState>) { }  

  save() {    
    this.store.dispatch(new playerActions.Create(this.model));  
    this.model = {
      id: undefined,
      firstName: "",
      lastName: "",
      clubElo: 100
    };
  }
}