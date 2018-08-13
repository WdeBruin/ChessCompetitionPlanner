import { createFeatureSelector } from '@ngrx/store';
import { PlayerState } from './';
import * as actions from './player.actions';
import { Status } from '../../shared';

export function PlayerReducer(
  state: PlayerState,
  action: actions.PlayerActions) {

  switch (action.type) {
    case actions.GET_PLAYERS:
    case actions.UPDATE_PLAYER:
    case actions.DELETE_PLAYER:
      return {
        ...state,
        status: Status.Loading
      }
    case actions.PLAYER_ERROR:
      return {
        ...state,
        status: Status.Error
      }
    case actions.GET_PLAYERS_SUCCESS:
      return {
        data: action.players,
        status: Status.Loaded
      }
    case actions.CREATE_PLAYER_SUCCESS:
      return {
        ...state,
        status: Status.Loaded,
        data: [
          ...state.data,
          action.player
        ]
      }
    case actions.UPDATE_PLAYER_SUCCESS:
      return {
        ...state,
        status: Status.Loaded,
        data: state.data.map(player => {
          if (player.id !== action.updatedPlayer.id) {
            return player;
          }
          return action.updatedPlayer;
        })
      }
    case actions.DELETE_PLAYER_SUCCESS:
      return {
        ...state,
        status: Status.Loaded,
        data: state.data.filter(player => {
          player.id !== action.id
        })
      }
    default:
      return state;
  }
}

export const playerSelector = createFeatureSelector<PlayerState>('player');
