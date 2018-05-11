import { Action } from "@ngrx/store";
import { Player } from "src/app/store/player/player.reducer";

export const CREATE     = '[Players] Create'
export const UPDATE     = '[Players] Update'
export const DELETE     = '[Players] Delete'

export class Create implements Action {
    readonly type = CREATE;
    constructor(public player: Player) { }
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: number,
        public changes: Partial<Player>,
      ) { }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: number) { }
}

export type PlayerActions
= Create
| Update
| Delete;