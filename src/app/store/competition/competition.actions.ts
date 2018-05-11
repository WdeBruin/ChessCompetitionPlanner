import { Action } from "@ngrx/store";
import { Competition } from "./competition.reducer";

export const CREATE_COMPETITION     = '[Competitions] Create'
export const UPDATE_COMPETITION     = '[Competitions] Update'
export const DELETE_COMPETITION     = '[Competitions] Delete'

export class Create implements Action {
    readonly type = CREATE_COMPETITION;
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
= Create
| Update
| Delete;
