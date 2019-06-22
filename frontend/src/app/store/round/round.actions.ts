import { Action } from '@ngrx/store';
import { Round } from './round.interface';

export const ROUND_ERROR = '[Rounds] OOPS';
export const GET_ROUNDS = '[Rounds] Get';
export const GET_ROUNDS_SUCCESS = '[Rounds] Get -- OK';
export const CREATE_ROUND = '[Rounds] Create';
export const CREATE_ROUND_SUCCESS = '[Rounds] Create -- OK';
export const UPDATE_ROUND = '[Rounds] Update';
export const UPDATE_ROUND_SUCCESS = '[Rounds] Update -- OK';
export const DELETE_ROUND = '[Rounds] Delete';
export const DELETE_ROUND_SUCCESS = '[Rounds] Delete -- OK';

export class RoundError implements Action {
  readonly type = ROUND_ERROR;
  constructor(public message: string) { }
}

export class Get implements Action {
  readonly type = GET_ROUNDS;
  constructor(public competitionKey: string) { }
}

export class GetSuccess implements Action {
  readonly type = GET_ROUNDS_SUCCESS;
  constructor(public readonly round: Round, public readonly key: string) { }
}

export class Create implements Action {
  readonly type = CREATE_ROUND;
  constructor(public round: Round, public readonly competitionKey: string) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_ROUND_SUCCESS;
  constructor() { }
}

export class Update implements Action {
  readonly type = UPDATE_ROUND;
  constructor(
    public updatedRound: Round, public readonly competitionKey: string) { }
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_ROUND_SUCCESS;
  constructor(
    public updatedRound: Round) { }
}

export class Delete implements Action {
  readonly type = DELETE_ROUND;
  constructor(public id: number) { }
}

export class DeleteSuccess implements Action {
  readonly type = DELETE_ROUND_SUCCESS;
  constructor(public id: number) { }
}

export type RoundActions
  =
  Get
  | GetSuccess
  | Create
  | CreateSuccess
  | Update
  | UpdateSuccess
  | Delete
  | DeleteSuccess
  | RoundError;
