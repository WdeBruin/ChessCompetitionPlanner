import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as competitionActions from "./competition.actions";
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { CompetitionService } from '../../shared/competition.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class CompetitionEffects {
    constructor(private competitionService: CompetitionService, private actions: Actions) {
    }

    @Effect()
    public getCompetitions: Observable<Action> = this.actions
        .ofType<competitionActions.Get>(competitionActions.GET_COMPETITIONS)
        .pipe(
            switchMap(action => this.competitionService.getAllCompetitions().pipe(
                map(competitions => new competitionActions.GetSuccess(competitions)),
                catchError(error => this.handleError(error))
            ))
        );

    @Effect()
    public addCompetition: Observable<Action> = this.actions
        .ofType<competitionActions.Create>(competitionActions.CREATE_COMPETITION)
        .pipe(
            switchMap(action => this.competitionService.addCompetition(action.competition).pipe(
                map(competition => new competitionActions.CreateSuccess(competition)),
                catchError(error => this.handleError(error))
            ))
        );

    private handleError(error) {
        return of(new competitionActions.CompetitionError(error));
    }
}