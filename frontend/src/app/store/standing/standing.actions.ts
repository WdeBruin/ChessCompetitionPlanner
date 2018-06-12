import { Action } from "@ngrx/store";
import { Standing } from "./standing.interface";

export const CREATE_STANDING = '[Standings] Create'
export const UPDATE_STANDING = '[Standings] Update'
export const DELETE_STANDING = '[Standings] Delete'

export class Create implements Action {
  readonly type = CREATE_STANDING;
  constructor(public standing: Standing) { }
}

export class Update implements Action {
  readonly type = UPDATE_STANDING;
  constructor(
    public id: number,
    public changes: Partial<Standing>,
  ) { }
}

export class Delete implements Action {
  readonly type = DELETE_STANDING;
  constructor(public id: number) { }
}

export type StandingActions
  = Create
  | Update
  | Delete;