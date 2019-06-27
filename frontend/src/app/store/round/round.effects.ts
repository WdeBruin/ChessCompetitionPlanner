import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as roundActions from './round.actions';
import { Round } from './round.interface';

@Injectable()
export class RoundEffects {
  constructor(private actions: Actions, private db: AngularFireDatabase) {
  }

  @Effect()
  public getRoundsForCompetition: Observable<Action> = this.actions.pipe(
    ofType<roundActions.Get>(roundActions.GET_ROUNDS),
    switchMap(action => {
      const result = this.db.list<Round>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/rounds`);
      return result.stateChanges();
    }),
    map(action => {
      return new roundActions.GetSuccess(action.payload.val(), action.key);
    }),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public createRound: Observable<Action> = this.actions.pipe(
    ofType<roundActions.Create>(roundActions.CREATE_ROUND),
    switchMap(action => this.db.list<Round>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/rounds`).push(action.round)
      .then(() => new roundActions.CreateSuccess())),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public updateRound: Observable<Action> = this.actions.pipe(
    ofType<roundActions.Update>(roundActions.UPDATE_ROUND),
    mergeMap(action =>
      this.db.object<Round>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/rounds/${action.updatedRound.key}`)
      .set(action.updatedRound)
        .then(() => new roundActions.UpdateSuccess(action.updatedRound))
    ),
    catchError(error => this.handleError(error))
  );

  private handleError(error: string) {
    console.log(error);
    return of(new roundActions.RoundError(error));
  }
}
