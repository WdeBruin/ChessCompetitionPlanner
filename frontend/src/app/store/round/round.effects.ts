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
        .ofType<roundActions.GetRoundsForCompetition>(roundActions.GET_ROUNDS_FOR_COMPETITION)
        .pipe(
            switchMap(action => this.roundService.getRounds(action.competitionId).pipe(
                map(rounds => new roundActions.GetRoundsForCompetitionSuccess(rounds)),
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
    public saveChangesRound: Observable<Action> = this.actions
    .ofType<roundActions.SaveChanges>(roundActions.SAVE_CHANGES_ROUND)
    .pipe(
        switchMap(action => this.roundService.updateRound(action.round).pipe(
            map(round => new roundActions.SaveChangesSuccess(round)),
            catchError(error => this.handleError(error))
        ))
    );
    
    private handleError(error) {
        return of(new roundActions.RoundError(error));
    }
}
