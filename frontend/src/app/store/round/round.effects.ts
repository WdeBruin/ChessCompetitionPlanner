import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Actions, Effect } from '@ngrx/effects';
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
    public getRoundsForCompetition: Observable<Action> = this.actions
        .ofType<roundActions.Get>(roundActions.GET_ROUNDS)
        .pipe(
            switchMap(() => {
                let result = this.db.list<Round>('rounds');
                return result.stateChanges();
            }),
            map(action => {
                return new roundActions.GetSuccess(action.payload.val(), action.key);
            }),
            catchError(error => this.handleError(error))
        );

    @Effect()
    public createRound: Observable<Action> = this.actions
    .ofType<roundActions.Create>(roundActions.CREATE_ROUND)
    .pipe(
        switchMap(action => this.db.list<Round>('rounds').push(action.round)
        .then(() => new roundActions.CreateSuccess())),
        catchError(error => this.handleError(error))
    );

    @Effect()
    public updateRound: Observable<Action> = this.actions
    .ofType<roundActions.Update>(roundActions.UPDATE_ROUND)
    .pipe(
        mergeMap(action =>
            this.db.object<Round>(`rounds/${action.updatedRound.key}`).set(action.updatedRound)
            .then(() => new roundActions.UpdateSuccess(action.updatedRound))
        ),
        catchError(error => this.handleError(error))
    );

    private handleError(error) {
        console.log(error);
        return of(new roundActions.RoundError(error));
    }
}
