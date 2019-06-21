import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as gameActions from './game.actions';
import { Game } from './game.interface';

@Injectable()
export class GameEffects {
  constructor(private actions: Actions, private db: AngularFireDatabase) {
  }

  @Effect()
  public getAllGamesForCompetition: Observable<Action> = this.actions.pipe(
    ofType<gameActions.GetAll>(gameActions.GET_ALL_GAMES),
    switchMap(() => {
      const result = this.db.list<Game>('games');
      return result.stateChanges();
    }),
    map(action => {
      return new gameActions.GetAllSuccess(action.payload.val(), action.key);
    }),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public createGame: Observable<Action> = this.actions.pipe(
    ofType<gameActions.Create>(gameActions.CREATE_GAME),
    switchMap(action => this.db.list<Game>('games').push(action.game)
      .then(() => new gameActions.CreateSuccess())),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public updateGame: Observable<Action> = this.actions.pipe(
    ofType<gameActions.Update>(gameActions.UPDATE_GAME),
    mergeMap(action =>
      this.db.object<Game>(`games/${action.updatedGame.key}`).set(action.updatedGame)
        .then(() => new gameActions.UpdateSuccess(action.updatedGame))
    ),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public deleteGame: Observable<Action> = this.actions.pipe(
    ofType<gameActions.Delete>(gameActions.DELETE_GAME),
    mergeMap(action => this.db.object<Game>(`games/${action.key}`).remove()
      .then(() => new gameActions.DeleteSuccess(action.key)))
  );

  private handleError(error: string) {
    console.log(error);
    return of(new gameActions.GameError(error));
  }
}
