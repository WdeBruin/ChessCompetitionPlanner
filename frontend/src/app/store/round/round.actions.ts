import { Action } from "@ngrx/store";
import { Round } from "./round.interface";

export const ROUND_ERROR = '[Rounds] OOPS'
export const CREATE_ROUND = '[Rounds] Create';
export const CREATE_ROUND_SUCCESS = '[Rounds] Create -- OK';
export const UPDATE_ROUND = '[Rounds] Update';
export const DELETE_ROUND = '[Rounds] Delete';
export const GET_ROUNDS_FOR_COMPETITION = '[Rounds] Get rounds for competition';
export const GET_ROUNDS_FOR_COMPETITION_SUCCESS = '[Rounds] Get rounds for competition -- OK';
export const SAVE_CHANGES_ROUND = '[Rounds] Save changes';
export const SAVE_CHANGES_ROUND_SUCCESS = '[Rounds] Save changes -- OK';

export class RoundError implements Action {
  readonly type = ROUND_ERROR;
  constructor(public message: string) {}
}

export class Create implements Action {
  readonly type = CREATE_ROUND;
  constructor(public round: Round) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_ROUND_SUCCESS;
  constructor(public round: Round) { }
}

export class Update implements Action {
  readonly type = UPDATE_ROUND;
  constructor(
    public id: number,
    public changes: Partial<Round>,
  ) { }
}

export class SaveChanges implements Action {
  readonly type = SAVE_CHANGES_ROUND;
  constructor(public round: Round) { }
}

export class SaveChangesSuccess implements Action {
  readonly type = SAVE_CHANGES_ROUND_SUCCESS;
  constructor(public round: Round) { }
}

export class Delete implements Action {
  readonly type = DELETE_ROUND;
  constructor(public id: number) { }
}

export class GetRoundsForCompetition implements Action {
  readonly type = GET_ROUNDS_FOR_COMPETITION;  
  constructor(public competitionId: number) {
  }
}

export class GetRoundsForCompetitionSuccess implements Action {
  readonly type = GET_ROUNDS_FOR_COMPETITION_SUCCESS;
  constructor(public rounds: Round[]) {}
}

export type RoundActions
  = Create
  | CreateSuccess
  | Update
  | Delete
  | RoundError
  | GetRoundsForCompetition
  | GetRoundsForCompetitionSuccess;