import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState, playerSelector, PlayerState } from '../store';
import * as playerActions from '../store/player/player.actions';
import { Status, AuthService } from '../shared';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: 'players-component.html'
})
export class PlayersComponent implements OnInit {
    playerState$: Observable<PlayerState>;
    public displayedColumns = ['firstName', 'lastName', 'clubElo'];
    private selectedClubKey: string;

    constructor(private store: Store<IAppState>, private authService: AuthService, private route: ActivatedRoute) {
        this.playerState$ = this.store.select(playerSelector);

        this.route.params.subscribe(params => {
          this.selectedClubKey = params.clubKey;
        });
     }

    ngOnInit(): void {
        this.authService.loginIfNotLoggedIn();
        this.store.dispatch(new playerActions.GetPlayers(this.selectedClubKey));
    }
}
