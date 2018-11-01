import { Injectable } from '@angular/core';
import { Effect, Actions } from "@ngrx/effects";
import * as playerActions from "./player.actions";
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { PlayerService } from '../../shared/player.service';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { AngularFireDatabase } from '@angular/fire/database';
import { Player } from './player.interface';


@Injectable()
export class PlayerEffects {
    constructor(private playerService: PlayerService, private actions: Actions, private db: AngularFireDatabase) {
    }
 
    @Effect()
    public getPlayers$: Observable<Action> = this.actions
        .ofType<playerActions.GetPlayers>(playerActions.GET_PLAYERS)
        .pipe(
            switchMap(action => {
                var result = this.db.list<Player[]>('players');
                return result.stateChanges()
            }),
            map(action => {
                return new playerActions.GetPlayersSuccess(action.payload.val())
            }),
            catchError(error => this.handleError(error))

            // switchMap(action => this.playerService.getAllPlayers().pipe(
            //     map(players => new playerActions.GetPlayersSuccess(players)),
            //     catchError(error => this.handleError(error))
            // ))
        );

    @Effect()
    public addPlayer$: Observable<Action> = this.actions
        .ofType<playerActions.Create>(playerActions.CREATE_PLAYER)
        .pipe(
            switchMap(action => this.playerService.addPlayer(action.player).pipe(
                map(player => new playerActions.CreateSuccess(player)),
                catchError(error => this.handleError(error))
            ))
        );

    @Effect()
    public updatePlayer$: Observable<Action> = this.actions
        .ofType<playerActions.Update>(playerActions.UPDATE_PLAYER)
        .pipe(
            mergeMap(action => this.playerService.updatePlayer(action.updatedPlayer).pipe(
                map(player => new playerActions.UpdateSuccess(player)),
                catchError(error => this.handleError(error))
            ))
        );

    @Effect()
    public deletePlayer$: Observable<Action> = this.actions
        .ofType<playerActions.Delete>(playerActions.DELETE_PLAYER)
            .pipe(
                switchMap(action => this.playerService.deletePlayer(action.id).pipe(
                    map(player => new playerActions.DeleteSuccess(action.id)),
                    catchError(error => this.handleError(error))
                ))
            );

    private handleError(error) {
        return of(new playerActions.PlayerError(error));
    }
}
