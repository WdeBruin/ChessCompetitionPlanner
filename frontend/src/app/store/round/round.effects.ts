import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as roundActions from "./round.actions";
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { RoundService } from '../../shared/round.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class RoundEffects {
    constructor(private roundService: RoundService, private actions: Actions) {
    }

    @Effect()
    public getRoundsForCompetition: Observable<Action> = this.actions
        .ofType<roundActions.Get>(roundActions.GET_ROUNDS)
        .pipe(
            switchMap(action => this.roundService.getRounds(action.competitionId).pipe(
                map(rounds => new roundActions.GetSuccess(action.competitionId, rounds)),
                catchError(error => this.handleError(error))
            ))
        );

    @Effect()
    public createRound: Observable<Action> = this.actions
    .ofType<roundActions.Create>(roundActions.CREATE_ROUND)
    .pipe(
        switchMap(action => this.roundService.addRound(action.round).pipe(
            map(round => new roundActions.CreateSuccess(round)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public updateRound: Observable<Action> = this.actions
    .ofType<roundActions.Update>(roundActions.UPDATE_ROUND)
    .pipe(
        switchMap(action => this.roundService.updateRound(action.updatedRound).pipe(
            map(round => new roundActions.UpdateSuccess(round)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public deleteRound: Observable<Action> = this.actions
    .ofType<roundActions.Delete>(roundActions.DELETE_ROUND)
    .pipe(
        switchMap(action => this.roundService.deleteRound(action.id).pipe(
            map(round => new roundActions.DeleteSuccess(round.id)),
            catchError(error => this.handleError(error))
        ))
    );
    
    private handleError(error) {
        return of(new roundActions.RoundError(error));
    }
}
