import { Action } from '@ngrx/store';
import { Club } from './club.interface';

export const CLUB_ERROR = '[Clubs] OOPS';
export const GET_CLUBS = '[Clubs] Get all';
export const GET_CLUBS_SUCCESS = '[Clubs] Get all -- OK';
export const CREATE_CLUB = '[Clubs] Create';
export const CREATE_CLUB_SUCCESS = '[Clubs] Create -- OK';
export const UPDATE_CLUB = '[Clubs] Update';
export const UPDATE_CLUB_SUCCESS = '[Clubs] Update -- OK';
export const DELETE_CLUB = '[Clubs] Delete';
export const DELETE_CLUB_SUCCESS = '[Clubs] Delete -- OK';

export class Get implements Action {
    readonly type = GET_CLUBS;
}

export class GetSuccess implements Action {
    readonly type = GET_CLUBS_SUCCESS;
    constructor(public readonly club: Club, public readonly key: string) { }
}

export class ClubError implements Action {
    readonly type = CLUB_ERROR;
    constructor(public message: string) {}
  }

export class Create implements Action {
    readonly type = CREATE_CLUB;
    constructor(public club: Club) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_CLUB_SUCCESS;
    constructor() { }
  }

export class Update implements Action {
    readonly type = UPDATE_CLUB;
    constructor(public updatedClub: Club) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_CLUB_SUCCESS;
    constructor(public updatedClub: Club) { }
}

export type ClubActions
    = Get
    | GetSuccess
    | ClubError
    | Create
    | CreateSuccess
    | Update
    | UpdateSuccess;
