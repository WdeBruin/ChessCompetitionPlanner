import { PlayerState } from './player.interface';
import { PlayersActionTypes, PlayersActionsUnion } from './players.actions';
import { Action } from '@ngrx/store';

// let defaultState = [];
let defaultState = [
    <PlayerState> {
        id: 0,
        firstName: "Player",
        lastName: "0"
    },
    <PlayerState> {
        id: 1,
        firstName: "Player",
        lastName: "1"
    },
    <PlayerState> {
        id: 2,
        firstName: "Player",
        lastName: "2"
    },
    <PlayerState> {
        id: 3,
        firstName: "Player",
        lastName: "3"
    },
    <PlayerState> {
        id: 4,
        firstName: "Player",
        lastName: "4"
    },
    <PlayerState> {
        id: 5,
        firstName: "Player",
        lastName: "5"
    },
    <PlayerState> {
        id: 6,
        firstName: "Player",
        lastName: "6"
    },
];

export function PlayersReducer(state: PlayerState[] = defaultState, action: PlayersActionsUnion): PlayerState[] {
    switch (action.type) {
        case PlayersActionTypes.ADD_PLAYER:
            return [
                ...state,
                <PlayerState>{
                    id: state.length,
                    firstName: action.player.firstName,
                    lastName: action.player.lastName
                }
            ];
        default:
            return state;
    }
}