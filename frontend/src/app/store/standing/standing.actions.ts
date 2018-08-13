import { Action } from "@ngrx/store";
import { Standing } from "src/app/store/standing/standing.interface";

export const STANDING_ERROR = '[Standings] OOPS';
export const GET_STANDINGS = '[Standings] Get'
export const GET_STANDINGS_SUCCESS = '[Standings] Get -- OK'
export const CREATE_STANDING = '[Standings] Create'
export const CREATE_STANDING_SUCCESS = '[Standings] Create -- OK'
export const UPDATE_STANDING = '[Standings] Update'
export const UPDATE_STANDING_SUCCESS = '[Standings] Update -- OK'
export const DELETE_STANDING = '[Standings] Delete'
export const DELETE_STANDING_SUCCESS = '[Standings] Delete -- OK'

export class StandingError implements Action {
  readonly type = STANDING_ERROR;
  constructor(public message: string) { }
}

export class Get implements Action {
  readonly type = GET_STANDINGS;
  constructor(public roundId: number) { }
}

export class GetSuccess implements Action {
  readonly type = GET_STANDINGS_SUCCESS;
  constructor(public roundId, public standings: Standing[]) { }
}

export class Create implements Action {
  readonly type = CREATE_STANDING;
  constructor(public standing: Standing) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_STANDING_SUCCESS;
  constructor(public standing: Standing) { }
}

export class Update implements Action {
  readonly type = UPDATE_STANDING;
  constructor(public updatedStanding: Standing) { }
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_STANDING_SUCCESS;
  constructor(public updatedStanding: Standing) { }
}

export class Delete implements Action {
  readonly type = DELETE_STANDING;
  constructor(public id: number) { }
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_STANDING_SUCCESS;
  constructor(public id: number) { }
}

export type StandingActions
  = StandingError 
  | Get
  | GetSuccess
  | Create
  | CreateSuccess
  | Update
  | UpdateSuccess
  | Delete
  | DeleteSuccess;
