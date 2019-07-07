import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as gameActions from './game.actions';
import { Game } from './game.interface';

@Injectable()
export class GameEffects {
  constructor(private actions: Actions, private db: AngularFirestore) {
  }

  @Effect()
  public getAllGamesForCompetition: Observable<Action> = this.actions.pipe(
    ofType<gameActions.GetAll>(gameActions.GET_ALL_GAMES),
    switchMap(action => {
      const result = this.db.collection<Game>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/games`);
      return result.snapshotChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return new gameActions.GetAllSuccess(action.payload.doc.data(), action.payload.doc.id);
    }),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public createGame: Observable<Action> = this.actions.pipe(
    ofType<gameActions.Create>(gameActions.CREATE_GAME),
    switchMap(action => this.db.collection<Game>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/games`).add(action.game)
      .then(() => {
        return new gameActions.CreateSuccess();
      }
        )),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public updateGame: Observable<Action> = this.actions.pipe(
    ofType<gameActions.Update>(gameActions.UPDATE_GAME),
    mergeMap(action =>
      this.db.doc<Game>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/games/${action.updatedGame.key}`)
        .set(action.updatedGame)
        .then(() => new gameActions.UpdateSuccess(action.updatedGame))
    ),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public deleteGame: Observable<Action> = this.actions.pipe(
    ofType<gameActions.Delete>(gameActions.DELETE_GAME),
    mergeMap(action => this.db.collection<Game>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/games`).doc(`${action.key}`).delete()
      .then(() => new gameActions.DeleteSuccess(action.key)))
  );

  private handleError(error: string) {
    console.log(error);
    return of(new gameActions.GameError(error));
  }
}
