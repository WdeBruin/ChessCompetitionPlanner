import { Action } from "@ngrx/store";
import { Player } from "./player.interface";

export const PLAYER_ERROR = '[Player] OOPS';
export const GET_PLAYERS = '[Players] Get all';
export const GET_PLAYERS_SUCCESS = '[Players] Get all -- OK';
export const CREATE_PLAYER = '[Players] Create';
export const CREATE_PLAYER_SUCCESS = '[Players] Create -- OK';
export const UPDATE_PLAYER = '[Players] Update';
export const UPDATE_PLAYER_SUCCESS = '[Players] Update -- OK';
export const DELETE_PLAYER = '[Players] Delete';
export const DELETE_PLAYER_SUCCESS = '[Players] Delete -- OK';

export class GetPlayers implements Action {
  readonly type = GET_PLAYERS;  
}

export class GetPlayersSuccess implements Action {
  readonly type = GET_PLAYERS_SUCCESS;
  constructor(public readonly player: Player, public readonly key: string) {}
}

export class PlayerError implements Action {
  readonly type = PLAYER_ERROR;  
  constructor(public readonly message: string) {}
}

export class Create implements Action {
  readonly type = CREATE_PLAYER;  
  constructor(public readonly player: Player) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_PLAYER_SUCCESS;
  constructor() { }
}



export type PlayerActions
  = GetPlayers
  | GetPlayersSuccess
  | PlayerError
  | Create
  | CreateSuccess;
