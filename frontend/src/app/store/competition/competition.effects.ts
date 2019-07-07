import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as competitionActions from './competition.actions';
import { Competition } from './competition.interface';

@Injectable()
export class CompetitionEffects {
  constructor(private actions: Actions, private db: AngularFirestore) {
  }

  @Effect()
  public getCompetitions$: Observable<Action> = this.actions.pipe(
    ofType<competitionActions.Get>(competitionActions.GET_COMPETITIONS),
    switchMap(action => {
      const result = this.db.collection<Competition>(`clubs/${action.clubKey}/competitions`);
      return result.snapshotChanges();
    }),
    mergeMap(actions => actions),
    map(action => {
      return new competitionActions.GetSuccess(action.payload.doc.data(), action.payload.doc.id);
    }),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public addCompetition$: Observable<Action> = this.actions.pipe(
    ofType<competitionActions.Create>(competitionActions.CREATE_COMPETITION),
    switchMap(action => this.db.collection<Competition>(`clubs/${action.clubKey}/competitions`).add(action.competition)
      .then(() => new competitionActions.CreateSuccess())),
    catchError(error => this.handleError(error))
  );

  @Effect()
  public updateCompetition$: Observable<Action> = this.actions.pipe(
    ofType<competitionActions.Update>(competitionActions.UPDATE_COMPETITION),
    mergeMap(action =>
      this.db.doc<Competition>(`clubs/${action.clubKey}/competitions/${action.updatedCompetition.key}`).set(action.updatedCompetition)
        .then(() => new competitionActions.UpdateSuccess(action.updatedCompetition))
    ),
    catchError(error => this.handleError(error))
  );

  private handleError(error: string) {
    return of(new competitionActions.CompetitionError(error));
  }
}
