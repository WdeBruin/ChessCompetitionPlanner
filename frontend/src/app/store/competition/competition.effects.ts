import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Actions, Effect } from '@ngrx/effects';
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
    public getCompetitions$: Observable<Action> = this.actions
        .ofType<competitionActions.Get>(competitionActions.GET_COMPETITIONS)
        .pipe(
            switchMap(() => {
                let result = this.db.list<Competition>('competitions');
                return result.stateChanges();
            }),
            map(action => {
                return new competitionActions.GetSuccess(action.payload.val(), action.key);
            }),
            catchError(error => this.handleError(error))
        );

    @Effect()
    public addCompetition$: Observable<Action> = this.actions
        .ofType<competitionActions.Create>(competitionActions.CREATE_COMPETITION)
        .pipe(
            switchMap(action => this.db.list<Competition>('competitions').push(action.competition)
            .then(() => new competitionActions.CreateSuccess())),
            catchError(error => this.handleError(error))
        );

    @Effect()
    public updateCompetition$: Observable<Action> = this.actions
        .ofType<competitionActions.Update>(competitionActions.UPDATE_COMPETITION)
        .pipe(
            mergeMap(action =>
                this.db.object<Competition>(`competitions/${action.updatedCompetition.key}`).set(action.updatedCompetition)
                .then(() => new competitionActions.UpdateSuccess(action.updatedCompetition))
            ),
            catchError(error => this.handleError(error))
        );

    private handleError(error) {
        return of(new competitionActions.CompetitionError(error));
    }
}
