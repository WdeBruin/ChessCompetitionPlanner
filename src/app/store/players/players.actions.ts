import { Action } from '@ngrx/store';

export enum PlayerActionTypes {
    ADD_PLAYER = '[Players] Add player'
  }

export class AddPlayer implements Action {
    readonly type = PlayerActionTypes.ADD_PLAYER;

    constructor(public name: string) {}
}

export type PlayerActionsUnion = AddPlayer;