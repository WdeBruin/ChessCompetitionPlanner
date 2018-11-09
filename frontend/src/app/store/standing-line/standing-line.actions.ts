import { Action } from "@ngrx/store";
import { StandingLine } from "./standing-line.interface";

export const STANDING_LINE_ERROR = '[StandingLines] OOPS';
export const GET_STANDING_LINES = '[StandingLines] Get'
export const GET_STANDING_LINES_SUCCESS = '[StandingLines] Get -- OK'
export const CREATE_STANDING_LINE = '[StandingLines] Create'
export const CREATE_STANDING_LINE_SUCCESS = '[StandingLines] Create -- OK'
export const UPDATE_STANDING_LINE = '[StandingLines] Update'
export const UPDATE_STANDING_LINE_SUCCESS = '[StandingLines] Update -- OK'
export const DELETE_STANDING_LINE = '[StandingLines] Delete'
export const DELETE_STANDING_LINE_SUCCESS = '[StandingLines] Delete -- OK'

export class StandingLineError implements Action {
  readonly type = STANDING_LINE_ERROR;
  constructor(public message: string) { }
}

export class Get implements Action {
  readonly type = GET_STANDING_LINES;
  constructor(public competitionKey: string, public roundNumber: number) { }
}

export class GetSuccess implements Action {
  readonly type = GET_STANDING_LINES_SUCCESS;
  constructor(public readonly standingLine: StandingLine, public readonly key: string) { }
}

export class Create implements Action {
  readonly type = CREATE_STANDING_LINE;
  constructor(public standingLine: StandingLine) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_STANDING_LINE_SUCCESS;
  constructor() { }
}

export class Update implements Action {
  readonly type = UPDATE_STANDING_LINE;
  constructor(public updatedStandingLine: StandingLine) { }
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_STANDING_LINE_SUCCESS;
  constructor(public updatedStandingLine: StandingLine) { }
}

export class Delete implements Action {
  readonly type = DELETE_STANDING_LINE;
  constructor(public key: string) { }
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_STANDING_LINE_SUCCESS;
  constructor(public key: string) { }
}

export type StandingLineActions
  = StandingLineError 
  | Get
  | GetSuccess
  | Create
  | CreateSuccess
  | Update
  | UpdateSuccess
  | Delete
  | DeleteSuccess;
