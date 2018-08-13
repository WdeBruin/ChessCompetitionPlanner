import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IAppState, Player, playerSelector } from '../store';
import * as playerActions from '../store/player/player.actions';
import { Status } from '../shared';

@Component({
    templateUrl: "players-component.html"
})
export class PlayersComponent implements OnInit {
    players$: Observable<Player[]>;
    playersStatus$: Observable<Status>;
    public displayedColumns = ["firstName", "lastName", "clubElo"];

    constructor(private store: Store<IAppState>) {
        this.players$ = this.store.select(playerSelector).select(p => p.data);
        this.playersStatus$ = this.store.select(playerSelector).select(p => p.status);
     }

    ngOnInit(): void {
        this.store.dispatch(new playerActions.GetPlayers());
    }
}
