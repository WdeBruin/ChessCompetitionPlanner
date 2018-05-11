import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { PlayerState } from '../store/players/player.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate.interface';
import * as actions from '../store/player/player.actions';
import * as fromPlayer from '../store/player/player.reducer';

@Component({
    templateUrl: "players-component.html"
})
export class PlayersComponent implements OnInit {
    players$: Observable<fromPlayer.Player[]>   

    constructor(private store: Store<fromPlayer.State>) { }

    ngOnInit(): void {
        this.players$ = this.store.select(fromPlayer.selectAll);
    }
}