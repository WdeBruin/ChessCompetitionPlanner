import { Action } from "@ngrx/store";
import { Game } from "src/app/store/game/game.interface";

export const CREATE_GAME = '[Games] Create'
export const UPDATE_GAME = '[Games] Update'
export const DELETE_GAME = '[Games] Delete'

export class Create implements Action {
  readonly type = CREATE_GAME;
  constructor(public game: Game) { }
}

export class Update implements Action {
  readonly type = UPDATE_GAME;
  constructor(
    public id: number,
    public changes: Partial<Game>,
  ) { }
}

export class Delete implements Action {
  readonly type = DELETE_GAME;
  constructor(public id: number) { }
}

export type GameActions
  = Create
  | Update
  | Delete;