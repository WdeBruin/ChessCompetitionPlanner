import { Action } from "@ngrx/store";
import { Player } from "src/app/store/player/player.reducer";

export const CREATE_PLAYER = '[Players] Create'
export const UPDATE_PLAYER = '[Players] Update'
export const DELETE_PLAYER = '[Players] Delete'

export class Create implements Action {
  readonly type = CREATE_PLAYER;
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
  = Create
  | Update
  | Delete;