import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PlayerState } from '../store/players/player.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate.interface';

@Component({
    templateUrl: "players-component.html"
})
export class PlayersComponent implements OnInit {
    players$: Observable<PlayerState[]>

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.players$ = this.store.select(s => s.players);
    }
}