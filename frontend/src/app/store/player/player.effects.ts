import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as playerActions from './player.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from './player.interface';


@Injectable()
export class PlayerEffects {
  constructor(private actions: Actions, private db: AngularFirestore) {
  }

  @Effect()
  public getPlayers$: Observable<Action> = this.actions.pipe(
    ofType<playerActions.GetPlayers>(playerActions.GET_PLAYERS),
    switchMap(action => {
      const result = this.db.collection<Player>(`clubs/${action.clubkey}/players`);
      return result.snapshotChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return new playerActions.GetPlayersSuccess(action.payload.doc.data(), action.payload.doc.id);
    }),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public addPlayer$: Observable<Action> = this.actions.pipe(
    ofType<playerActions.Create>(playerActions.CREATE_PLAYER),
    switchMap(action => this.db.collection<Player>(`clubs/${action.clubkey}/players`).add(action.player)
      .then(() => new playerActions.CreateSuccess())),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public updatePlayer$: Observable<Action> = this.actions.pipe(
    ofType<playerActions.Update>(playerActions.UPDATE_PLAYER),
    mergeMap(action =>
      this.db.doc<Player>(`clubs/${action.clubkey}/players/${action.updatedPlayer.key}`).set(action.updatedPlayer)
        .then(() => new playerActions.UpdateSuccess(action.updatedPlayer))
    ),
    catchError(error => this.handleError(error))
  );

  private handleError(error: string) {
    return of(new playerActions.PlayerError(error));
  }
}
