import { Injectable } from '@angular/core';
import { Effect, Actions } from "@ngrx/effects";
import * as playerActions from "./player.actions";
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { AngularFireDatabase } from '@angular/fire/database';
import { Player } from './player.interface';


@Injectable()
export class PlayerEffects {
    constructor(private actions: Actions, private db: AngularFireDatabase) {
    }

    @Effect()
    public getPlayers$: Observable<Action> = this.actions
        .ofType<playerActions.GetPlayers>(playerActions.GET_PLAYERS)
        .pipe(
            switchMap(() => {
                var result = this.db.list<Player>('players');
                return result.stateChanges();
            }),
            map(action => {
                return new playerActions.GetPlayersSuccess(action.payload.val(), action.key);
            }),
            catchError(error => this.handleError(error))
        );

    @Effect()
    public addPlayer$: Observable<Action> = this.actions
        .ofType<playerActions.Create>(playerActions.CREATE_PLAYER)
        .pipe(
            switchMap(action => this.db.list<Player>('players').push(action.player)),
            map(() => {
                return new playerActions.CreateSuccess();
            })
        );

    @Effect()
    public updatePlayer$: Observable<Action> = this.actions
        .ofType<playerActions.Update>(playerActions.UPDATE_PLAYER)
        .pipe(
            // mergeMap(action => this.playerService.updatePlayer(action.updatedPlayer).pipe(
            //     map(player => new playerActions.UpdateSuccess(player)),
            //     catchError(error => this.handleError(error))
            // ))
        );

    private handleError(error) {
        return of(new playerActions.PlayerError(error));
    }
}
