import { Players } from './players.interface';
import { PlayerActionTypes, PlayerActionsUnion } from './players.actions';
import { Action } from '@ngrx/store';

export function PlayersReducer(state: Players = <Players>{}, action: PlayerActionsUnion): Players {
    switch(action.type) {
        case PlayerActionTypes.ADD_PLAYER:
            return {
                ...state,                
            }
        default:
            return state;
    }
}