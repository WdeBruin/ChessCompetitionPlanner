import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as gameActions from './game.actions';
import { GameService } from '../../shared/game.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class GameEffects {
    constructor(private gameService: GameService, private actions: Actions) {
    }

    @Effect()
    public getGamesForCompetition: Observable<Action> = this.actions
        .ofType<gameActions.Get>(gameActions.GET_GAMES)
        .pipe(
            switchMap(action => this.gameService.getGames(action.competitionId, action.roundId).pipe(
                map(games => new gameActions.GetSuccess(action.roundId, games)),
                catchError(error => this.handleError(error))
            ))
        );

    @Effect()
    public createGame: Observable<Action> = this.actions
    .ofType<gameActions.Create>(gameActions.CREATE_GAME)
    .pipe(
        switchMap(action => this.gameService.addGame(action.game).pipe(
            map(game => new gameActions.CreateSuccess(game)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public updateGame: Observable<Action> = this.actions
    .ofType<gameActions.Update>(gameActions.UPDATE_GAME)
    .pipe(
        switchMap(action => this.gameService.updateGame(action.updatedGame).pipe(
            map(game => new gameActions.UpdateSuccess(game)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public deleteGame: Observable<Action> = this.actions
    .ofType<gameActions.Delete>(gameActions.DELETE_GAME)
    .pipe(
        switchMap(action => this.gameService.deleteGame(action.id).pipe(
            map(game => new gameActions.DeleteSuccess(game.id)),
            catchError(error => this.handleError(error))
        ))
    );
    
    private handleError(error) {
        return of(new gameActions.GameError(error));
    }
}
