import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as competitionActions from './competition.actions';
import { Competition } from './competition.interface';

@Injectable()
export class CompetitionEffects {
  constructor(private actions: Actions, private db: AngularFireDatabase) {
  }

  @Effect()
  public getCompetitions$: Observable<Action> = this.actions.pipe(
    ofType<competitionActions.Get>(competitionActions.GET_COMPETITIONS),
    switchMap(() => {
      const result = this.db.list<Competition>('competitions');
      return result.stateChanges();
    }),
    map(action => {
      return new competitionActions.GetSuccess(action.payload.val(), action.key);
    }),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public addCompetition$: Observable<Action> = this.actions.pipe(
    ofType<competitionActions.Create>(competitionActions.CREATE_COMPETITION),
    switchMap(action => this.db.list<Competition>('competitions').push(action.competition)
      .then(() => new competitionActions.CreateSuccess())),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public updateCompetition$: Observable<Action> = this.actions.pipe(
    ofType<competitionActions.Update>(competitionActions.UPDATE_COMPETITION),
    mergeMap(action =>
      this.db.object<Competition>(`competitions/${action.updatedCompetition.key}`).set(action.updatedCompetition)
        .then(() => new competitionActions.UpdateSuccess(action.updatedCompetition))
    ),
    catchError(error => this.handleError(error))
  );

  private handleError(error: string) {
    return of(new competitionActions.CompetitionError(error));
  }
}
