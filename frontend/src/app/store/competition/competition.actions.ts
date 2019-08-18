import { Action } from '@ngrx/store';
import { Competition } from './competition.interface';

export const COMPETITION_ERROR = '[Competitions] OOPS';
export const GET_COMPETITIONS = '[Competitions] Get all';
export const GET_COMPETITIONS_SUCCESS = '[Competitions] Get all -- OK';
export const CREATE_COMPETITION = '[Competitions] Create';
export const CREATE_COMPETITION_SUCCESS = '[Competitions] Create -- OK';
export const UPDATE_COMPETITION = '[Competitions] Update';
export const UPDATE_COMPETITION_SUCCESS = '[Competitions] Update -- OK';
export const DELETE_COMPETITION = '[Competitions] Delete';
export const DELETE_COMPETITION_SUCCESS = '[Competitions] Delete -- OK';
export const RESET = '[Competitions] Reset';

export class Get implements Action {
    readonly type = GET_COMPETITIONS;
    constructor(public readonly clubKey: string) { }
}

export class GetSuccess implements Action {
    readonly type = GET_COMPETITIONS_SUCCESS;
    constructor(public readonly competition: Competition, public readonly key: string) { }
}

export class CompetitionError implements Action {
    readonly type = COMPETITION_ERROR;
    constructor(public message: string) {}
  }

export class Create implements Action {
    readonly type = CREATE_COMPETITION;
    constructor(public competition: Competition, public readonly clubKey: string) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_COMPETITION_SUCCESS;
    constructor() { }
  }

export class Update implements Action {
    readonly type = UPDATE_COMPETITION;
    constructor(public updatedCompetition: Competition, public readonly clubKey: string) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_COMPETITION_SUCCESS;
    constructor(public updatedCompetition: Competition) { }
}

export class Reset implements Action {
  readonly type = RESET;
  constructor() { }
}

export type CompetitionActions
    = Get
    | GetSuccess
    | CompetitionError
    | Create
    | CreateSuccess
    | Update
    | UpdateSuccess
    | Reset;
