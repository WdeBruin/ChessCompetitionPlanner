import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as standingLineActions from './standing-line.actions';
import { StandingLine } from './standing-line.interface';

@Injectable()
export class StandingLineEffects {
    constructor(private actions: Actions, private db: AngularFireDatabase) {
    }

    @Effect()
    public getStandingLinesForCompetition: Observable<Action> = this.actions
        .ofType<standingLineActions.Get>(standingLineActions.GET_STANDING_LINES)
        .pipe(
            switchMap(() => {
                let result = this.db.list<StandingLine>('standingLines');
                return result.stateChanges();
            }),
            map(action => {
                return new standingLineActions.GetSuccess(action.payload.val(), action.key);
            }),
            catchError(error => this.handleError(error))
        );

    @Effect()
    public createStandingLine: Observable<Action> = this.actions
        .ofType<standingLineActions.Create>(standingLineActions.CREATE_STANDING_LINE)
        .pipe(
            mergeMap(action => this.db.list<StandingLine>('standingLines').push(action.standingLine)
            .then(() => new standingLineActions.CreateSuccess())),
            catchError(error => this.handleError(error))
        );

    @Effect()
    public updateStandingLine: Observable<Action> = this.actions
        .ofType<standingLineActions.Update>(standingLineActions.UPDATE_STANDING_LINE)
        .pipe(
            mergeMap(action =>
                this.db.object<StandingLine>(`standingLines/${action.updatedStandingLine.key}`).set(action.updatedStandingLine)
                .then(() => new standingLineActions.UpdateSuccess(action.updatedStandingLine))
            ),
            catchError(error => this.handleError(error))
        );

    @Effect()
    public deleteStandingLine: Observable<Action> = this.actions
        .ofType<standingLineActions.Delete>(standingLineActions.DELETE_STANDING_LINE)
        .pipe(
            mergeMap(action => this.db.object<StandingLine>(`standingLines/${action.key}`).remove()
                .then(() => new standingLineActions.DeleteSuccess(action.key)))
        );

    private handleError(error) {
        console.log(error);
        return of(new standingLineActions.StandingLineError(error));
    }
}
