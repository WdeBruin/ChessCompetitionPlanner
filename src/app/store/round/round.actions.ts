import { Action } from "@ngrx/store";
import { Round } from "./round.interface";

export const CREATE_ROUND = '[Rounds] Create'
export const UPDATE_ROUND = '[Rounds] Update'
export const DELETE_ROUND = '[Rounds] Delete'

export class Create implements Action {
  readonly type = CREATE_ROUND;
  constructor(public round: Round) { }
}

export class Update implements Action {
  readonly type = UPDATE_ROUND;
  constructor(
    public id: number,
    public changes: Partial<Round>,
  ) { }
}

export class Delete implements Action {
  readonly type = DELETE_ROUND;
  constructor(public id: number) { }
}

export type RoundActions
  = Create
  | Update
  | Delete;