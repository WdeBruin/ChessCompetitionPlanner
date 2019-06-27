import { Action } from '@ngrx/store';
import { Game } from 'src/app/store/game/game.interface';

export const GAME_ERROR = '[Games] OOPS';
export const GET_GAMES = '[Games] Get';
export const GET_GAMES_SUCCESS = '[Games] Get -- OK';
export const GET_ALL_GAMES = '[Games] Get all';
export const GET_ALL_GAMES_SUCCESS = '[Games] Get all -- OK';
export const CREATE_GAME = '[Games] Create';
export const CREATE_GAME_SUCCESS = '[Games] Create -- OK';
export const UPDATE_GAME = '[Games] Update';
export const UPDATE_GAME_SUCCESS = '[Games] Update -- OK';
export const DELETE_GAME = '[Games] Delete';
export const DELETE_GAME_SUCCESS = '[Games] Delete -- OK';

export class GameError implements Action {
  readonly type = GAME_ERROR;
  constructor(public readonly message: string) { }
}

export class GetAll implements Action {
  readonly type = GET_ALL_GAMES;
  constructor(public readonly clubKey: string, public readonly competitionKey: string, public readonly roundKey: string) { }
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_GAMES_SUCCESS;
  constructor(public readonly game: Game, public readonly key: string) { }
}

export class Create implements Action {
  readonly type = CREATE_GAME;
  constructor(public readonly game: Game, public readonly clubKey: string,
    public readonly competitionKey: string, public readonly roundKey: string) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_GAME_SUCCESS;
  constructor() { }
}

export class Update implements Action {
  readonly type = UPDATE_GAME;
  constructor(public readonly updatedGame: Game, public readonly clubKey: string,
    public readonly competitionKey: string, public readonly roundKey: string) { }
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_GAME_SUCCESS;
  constructor(public readonly updatedGame: Game) { }
}

export class Delete implements Action {
  readonly type = DELETE_GAME;
  constructor(public readonly key: string, public readonly clubKey: string,
    public readonly competitionKey: string, public readonly roundKey: string) { }
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_GAME_SUCCESS;
  constructor(public readonly key: string) { }
}

export type GameActions
  = GameError
  | GetAll
  | GetAllSuccess
  | Create
  | CreateSuccess
  | Update
  | UpdateSuccess
  | Delete
  | DeleteSuccess;
