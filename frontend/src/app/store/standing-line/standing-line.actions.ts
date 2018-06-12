import { Action } from "@ngrx/store";
import { StandingLine } from "./standing-line.interface";

export const CREATE_STANDING_LINE = '[StandingLines] Create'
export const UPDATE_STANDING_LINE = '[StandingLines] Update'
export const DELETE_STANDING_LINE = '[StandingLines] Delete'

export class Create implements Action {
  readonly type = CREATE_STANDING_LINE;
  constructor(public standingLine: StandingLine) { }
}

export class Update implements Action {
  readonly type = UPDATE_STANDING_LINE;
  constructor(
    public id: number,
    public changes: Partial<StandingLine>,
  ) { }
}

export class Delete implements Action {
  readonly type = DELETE_STANDING_LINE;
  constructor(public id: number) { }
}

export type StandingLineActions
  = Create
  | Update
  | Delete;