import { Action } from '@ngrx/store';
import { Player } from '../../shared/player';

export enum PlayersActionTypes {
    ADD_PLAYER = '[Players] Add player'
}

export class AddPlayer implements Action {
    readonly type = PlayersActionTypes.ADD_PLAYER;

    constructor(public player: Player) { }
}

export type PlayersActionsUnion = AddPlayer;