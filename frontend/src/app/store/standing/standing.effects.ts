import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as standingActions from './standing.actions';
import { StandingService } from '../../shared/standing.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class StandingEffects {
    constructor(private standingService: StandingService, private actions: Actions) {
    }

    @Effect()
    public getStandingsForCompetition: Observable<Action> = this.actions
        .ofType<standingActions.Get>(standingActions.GET_STANDINGS)
        .pipe(
            switchMap(action => this.standingService.getStandings(action.competitionId, action.roundNumber).pipe(
                map(standings => new standingActions.GetSuccess(standings)),
                catchError(error => this.handleError(error))
            ))
        );

    @Effect()
    public createStanding: Observable<Action> = this.actions
    .ofType<standingActions.Create>(standingActions.CREATE_STANDING)
    .pipe(
        switchMap(action => this.standingService.addStanding(action.standing).pipe(
            map(standing => new standingActions.CreateSuccess(standing)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public updateStanding: Observable<Action> = this.actions
    .ofType<standingActions.Update>(standingActions.UPDATE_STANDING)
    .pipe(
        switchMap(action => this.standingService.updateStanding(action.updatedStanding).pipe(
            map(standing => new standingActions.UpdateSuccess(standing)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public deleteStanding: Observable<Action> = this.actions
    .ofType<standingActions.Delete>(standingActions.DELETE_STANDING)
    .pipe(
        switchMap(action => this.standingService.deleteStanding(action.id).pipe(
            map(standing => new standingActions.DeleteSuccess(standing.id)),
            catchError(error => this.handleError(error))
        ))
    );
    
    private handleError(error) {
        return of(new standingActions.StandingError(error));
    }
}
