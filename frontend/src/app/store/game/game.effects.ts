import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import * as gameActions from './game.actions';
import { GameService } from '../../shared/game.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class GameEffects {
    constructor(private gameService: GameService, private actions: Actions) {
    }

    @Effect()
    public getAllGamesForCompetition: Observable<Action> = this.actions
    .ofType<gameActions.GetAll>(gameActions.GET_ALL_GAMES)
    .pipe(
        switchMap(action => this.gameService.getAllGames(action.competitionId).pipe(
            map(games => new gameActions.GetAllSuccess(action.competitionId, games)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public createGame: Observable<Action> = this.actions
    .ofType<gameActions.Create>(gameActions.CREATE_GAME)
    .pipe(
        mergeMap(action => this.gameService.addGame(action.game).pipe(
            map(game => new gameActions.CreateSuccess(game)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public updateGame: Observable<Action> = this.actions
    .ofType<gameActions.Update>(gameActions.UPDATE_GAME)
    .pipe(
        mergeMap(action => this.gameService.updateGame(action.updatedGame).pipe(
            map(game => new gameActions.UpdateSuccess(game)),
            catchError(error => this.handleError(error))
        ))
    );

    @Effect()
    public deleteGame: Observable<Action> = this.actions
    .ofType<gameActions.Delete>(gameActions.DELETE_GAME)
    .pipe(
        mergeMap(action => this.gameService.deleteGame(action.id).pipe(
            map(game => new gameActions.DeleteSuccess(game.id)),
            catchError(error => this.handleError(error))
        ))
    );
    
    private handleError(error) {
        return of(new gameActions.GameError(error));
    }
}
