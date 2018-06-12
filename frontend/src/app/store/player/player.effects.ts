import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as playerActions from "./player.actions";
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { GET_PLAYERS } from './player.actions';
import { PlayerService } from '../../shared/player.service';
import { mergeMap, map, catchError, switchMap, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class PlayerEffects {
    constructor(private playerService: PlayerService, private actions: Actions) {
    }

    @Effect()
    public getPlayers: Observable<Action> = this.actions
        .ofType<playerActions.GetPlayers>(playerActions.GET_PLAYERS)
        .pipe(
            switchMap(action => this.playerService.getAllPlayers().pipe(
                map(players => new playerActions.GetPlayersSuccess(players)),
                catchError(error => this.handleError(error))
            ))
        );

    @Effect()
    public addPlayer: Observable<Action> = this.actions
        .ofType<playerActions.Create>(playerActions.CREATE_PLAYER)
        .pipe(
            switchMap(action => this.playerService.addPlayer(action.player).pipe(
                map(player => new playerActions.CreateSuccess(player)),
                catchError(error => this.handleError(error))
            ))
        );

    private handleError(error) {
        return of(new playerActions.PlayerError(error));
    }
}
