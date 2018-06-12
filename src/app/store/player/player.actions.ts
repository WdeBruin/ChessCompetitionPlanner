import { Action } from "@ngrx/store";
import { Player } from "./player.interface";

export const PLAYER_ERROR = '[Player] OOPS';

export const GET_PLAYERS = '[Players] Get all';
export const GET_PLAYERS_SUCCESS = '[Players] Get all -- OK';
export const CREATE_PLAYER = '[Players] Create';
export const CREATE_PLAYER_SUCCESS = '[Players] Create -- OK';
export const UPDATE_PLAYER = '[Players] Update';
export const DELETE_PLAYER = '[Players] Delete';

export class GetPlayers implements Action {
  readonly type = GET_PLAYERS;  
}

export class GetPlayersSuccess implements Action {
  readonly type = GET_PLAYERS_SUCCESS;
  constructor(public players: Player[]) {}
}

export class PlayerError implements Action {
  readonly type = PLAYER_ERROR;  
  constructor(public message: string) {}
}

export class Create implements Action {
  readonly type = CREATE_PLAYER;  
  constructor(public player: Player) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_PLAYER_SUCCESS;
  constructor(public player: Player) { }
}

export class Update implements Action {
  readonly type = UPDATE_PLAYER;
  constructor(
    public id: number,
    public changes: Partial<Player>,
  ) { }
}

export class Delete implements Action {
  readonly type = DELETE_PLAYER;
  constructor(public id: number) { }
}

export type PlayerActions
  = GetPlayers
  | GetPlayersSuccess
  | PlayerError
  | Create
  | CreateSuccess
  | Update
  | Delete;