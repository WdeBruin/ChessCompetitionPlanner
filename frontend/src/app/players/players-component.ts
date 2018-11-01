import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState, Player, playerSelector } from '../store';
import * as playerActions from '../store/player/player.actions';
import { Status } from '../shared';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: "players-component.html"
})
export class PlayersComponent implements OnInit {
    players$: Observable<Player[]>;
    playersStatus$: Observable<Status>;
    public displayedColumns = ["firstName", "lastName", "clubElo"];

    constructor(private store: Store<IAppState>) {
        this.players$ = this.store.select(playerSelector).pipe(map(p => p.data));
        this.playersStatus$ = this.store.select(playerSelector).pipe(map(p => p.status));
     }

    ngOnInit(): void {
        this.store.dispatch(new playerActions.GetPlayers());
    }
}
