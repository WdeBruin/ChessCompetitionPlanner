import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as standingLineActions from './standing-line.actions';
import { StandingLine } from './standing-line.interface';

@Injectable()
export class StandingLineEffects {
  constructor(private actions: Actions, private db: AngularFirestore) {
  }

  @Effect()
  public getStandingLinesForCompetition: Observable<Action> = this.actions.pipe(
    ofType<standingLineActions.Get>(standingLineActions.GET_STANDING_LINES),
    switchMap(action => {
      const result = this.db.collection<StandingLine>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/standingLines`);
      return result.snapshotChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return new standingLineActions.GetSuccess(action.payload.doc.data(), action.payload.doc.id);
    }),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public createStandingLine: Observable<Action> = this.actions.pipe(
    ofType<standingLineActions.Create>(standingLineActions.CREATE_STANDING_LINE),
    mergeMap(action => this.db.collection<StandingLine>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/standingLines`)
      .add(action.standingLine)
      .then(() => new standingLineActions.CreateSuccess())),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public updateStandingLine: Observable<Action> = this.actions.pipe(
    ofType<standingLineActions.Update>(standingLineActions.UPDATE_STANDING_LINE),
    mergeMap(action =>
      this.db.doc<StandingLine>(`clubs/${action.clubKey}/competitions/${action.competitionKey}/standingLines/${action.updatedStandingLine.key}`)
        .set(action.updatedStandingLine)
        .then(() => new standingLineActions.UpdateSuccess(action.updatedStandingLine))
    ),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public deleteStandingLine: Observable<Action> = this.actions.pipe(
    ofType<standingLineActions.Delete>(standingLineActions.DELETE_STANDING_LINE),
    mergeMap(action => this.db.collection<StandingLine>(`clubs/${action.clubKey}/competitions/${action.competitionKey}
      /standingLines`).doc(`${action.key}`).delete()
      .then(() => new standingLineActions.DeleteSuccess(action.key)))
  );

  private handleError(error: string) {
    console.log(error);
    return of(new standingLineActions.StandingLineError(error));
  }
}
