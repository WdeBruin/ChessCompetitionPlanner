import { createFeatureSelector } from '@ngrx/store';
import { Status } from '../../shared';
import { PlayerState } from './';
import * as actions from './player.actions';

export function PlayerReducer(
  state: PlayerState = { data: [], status: undefined },
  action: actions.PlayerActions) {

  switch (action.type) {
    case actions.PLAYER_ERROR:
      return {
        ...state,
        status: Status.Error
      }
    case actions.GET_PLAYERS_SUCCESS:
      action.player.key = action.key

      if (state.data.find(x => x.key === action.key)) {
        return {
          data: state.data.map(player => {
            if (player.key !== action.key) {
              return player;
            }
            return action.player;
          }),
          status: Status.Loaded
        }
      } else {
        return {
          data: [...state.data, action.player],
          status: Status.Loaded
        }
      }
    default:
      return state;
  }
}

export const playerSelector = createFeatureSelector<PlayerState>('player');
