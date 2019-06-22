import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as clubActions from './club.actions';
import { Club } from './club.interface';

@Injectable()
export class ClubEffects {
  constructor(private actions: Actions, private db: AngularFireDatabase) {
  }

  @Effect()
  public getClubs$: Observable<Action> = this.actions.pipe(
    ofType<clubActions.Get>(clubActions.GET_CLUBS),
    switchMap(() => {
      const result = this.db.list<Club>('clubs');
      return result.stateChanges();
    }),
    map(action => {
      return new clubActions.GetSuccess(action.payload.val(), action.key);
    }),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public addClub$: Observable<Action> = this.actions.pipe(
    ofType<clubActions.Create>(clubActions.CREATE_CLUB),
    switchMap(action => this.db.list<Club>('clubs').push(action.club)
      .then(() => new clubActions.CreateSuccess())),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public updateClub$: Observable<Action> = this.actions.pipe(
    ofType<clubActions.Update>(clubActions.UPDATE_CLUB),
    mergeMap(action =>
      this.db.object<Club>(`clubs/${action.updatedClub.key}`).set(action.updatedClub)
        .then(() => new clubActions.UpdateSuccess(action.updatedClub))
    ),
    catchError(error => this.handleError(error))
  );

  private handleError(error: string) {
    return of(new clubActions.ClubError(error));
  }
}
