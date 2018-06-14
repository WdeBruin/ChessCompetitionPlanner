import { Action } from "@ngrx/store";
import { Competition } from "./competition.interface";

export const COMPETITION_ERROR = '[Competitions] OOPS';
export const GET_COMPETITIONS = '[Competitions] Get all';
export const GET_COMPETITIONS_SUCCESS = '[Competitions] Get all -- OK';
export const GET_COMPETITION_BY_ID = '[Competitions] Get by id';
export const GET_COMPETITION_BY_ID_SUCCESS = '[Competitions] Get by id -- OK';
export const CREATE_COMPETITION = '[Competitions] Create';
export const CREATE_COMPETITION_SUCCESS = '[Competitions] Create -- OK';

export const UPDATE_COMPETITION = '[Competitions] Update'
export const DELETE_COMPETITION = '[Competitions] Delete'

export class Get implements Action {
    readonly type = GET_COMPETITIONS;
}

export class GetSuccess implements Action {
    readonly type = GET_COMPETITIONS_SUCCESS;
    constructor(public competitions: Competition[]) { }
}

export class GetById implements Action {
    readonly type = GET_COMPETITION_BY_ID;
    constructor(public id: number) { }
}

export class GetByIdSuccess implements Action {
    readonly type = GET_COMPETITION_BY_ID_SUCCESS;
    constructor(public competition: Competition) { }
}

export class CompetitionError implements Action {
    readonly type = COMPETITION_ERROR;  
    constructor(public message: string) {}
  }

export class Create implements Action {
    readonly type = CREATE_COMPETITION;
    constructor(public competition: Competition) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_COMPETITION_SUCCESS;
    constructor(public competition: Competition) { }
  }

export class Update implements Action {
    readonly type = UPDATE_COMPETITION;
    constructor(
        public id: number,
        public changes: Partial<Competition>,
    ) { }
}

export class Delete implements Action {
    readonly type = DELETE_COMPETITION;
    constructor(public id: number) { }
}

export type CompetitionActions
    = Get 
    | GetSuccess
    | GetById
    | GetByIdSuccess
    | CompetitionError
    | Create
    | CreateSuccess
    | Update
    | Delete;
