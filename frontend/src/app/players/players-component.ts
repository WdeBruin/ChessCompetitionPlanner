import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as playerActions from '../store/player/player.actions';
import * as fromPlayer from '../store/player/player.reducer';
import { Player } from 'src/app/store/player/player.interface';

@Component({
    templateUrl: "players-component.html"
})
export class PlayersComponent implements OnInit {
    players$: Observable<Player[]>   
    public displayedColumns = ["firstName", "lastName", "clubElo"]

    constructor(private store: Store<fromPlayer.State>) {
        this.players$ = this.store.select(fromPlayer.selectAll);
     }

    ngOnInit(): void {
        this.store.dispatch(new playerActions.GetPlayers());
    }
}