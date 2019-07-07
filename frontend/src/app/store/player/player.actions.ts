import { Action } from '@ngrx/store';
import { Player } from './player.interface';

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
  constructor(public readonly clubkey: string) {}
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
  constructor(public readonly player: Player, public readonly clubkey: string) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_PLAYER_SUCCESS;
  constructor() { }
}

export class Update implements Action {
  readonly type = UPDATE_PLAYER;
  constructor(public readonly updatedPlayer: Player, public readonly clubkey: string) { }
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_PLAYER_SUCCESS;
  constructor(public readonly updatedPlayer: Player) { }
}


export type PlayerActions
  = GetPlayers
  | GetPlayersSuccess
  | PlayerError
  | Create
  | CreateSuccess
  | Update
  | UpdateSuccess;
