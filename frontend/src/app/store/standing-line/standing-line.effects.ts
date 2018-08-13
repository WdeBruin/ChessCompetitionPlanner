import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as standingLineActions from './standing-line.actions';
import { StandingLineService } from '../../shared/standing-line.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class StandingLineEffects {
    constructor(private standingLineService: StandingLineService, private actions: Actions) {
    }

    @Effect()
    public getStandingLinesForCompetition: Observable<Action> = this.actions
        .ofType<standingLineActions.Get>(standingLineActions.GET_STANDING_LINES)
        .pipe(
            switchMap(action => this.standingLineService.getStandingLines(action.standingId).pipe(
                map(standingLines => new standingLineActions.GetSuccess(action.standingId, standingLines)),
                catchError(error => this.handleError(error))
            ))
        );

    @Effect()
    public createStandingLine: Observable<Action> = this.actions
    .ofType<standingLineActions.Create>(standingLineActions.CREATE_STANDING_LINE)
    .pipe(
        switchMap(action => this.standingLineService.addStandingLine(action.standingLine).pipe(
            map(standingLine => new standingLineActions.CreateSuccess(standingLine)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public updateStandingLine: Observable<Action> = this.actions
    .ofType<standingLineActions.Update>(standingLineActions.UPDATE_STANDING_LINE)
    .pipe(
        switchMap(action => this.standingLineService.updateStandingLine(action.updatedStandingLine).pipe(
            map(standingLine => new standingLineActions.UpdateSuccess(standingLine)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public deleteStandingLine: Observable<Action> = this.actions
    .ofType<standingLineActions.Delete>(standingLineActions.DELETE_STANDING_LINE)
    .pipe(
        switchMap(action => this.standingLineService.deleteStandingLine(action.id).pipe(
            map(standingLine => new standingLineActions.DeleteSuccess(standingLine.id)),
            catchError(error => this.handleError(error))
        ))
    );
    
    private handleError(error) {
        return of(new standingLineActions.StandingLineError(error));
    }
}
