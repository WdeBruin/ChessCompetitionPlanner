import { createFeatureSelector } from '@ngrx/store';
import { Status } from '../../shared';
import { GameState } from './';
import * as actions from './game.actions';

const defaultState = { data: [], status: undefined };

export function GameReducer(
  state: GameState = defaultState,
  action: actions.GameActions) {
  switch (action.type) {
    case actions.GET_ALL_GAMES:
    case actions.UPDATE_GAME:
    case actions.DELETE_GAME:
      return {
        ...state,
        status: Status.Loading
      };
    case actions.GAME_ERROR:
      return {
        ...state,
        status: Status.Error
      };
    case actions.GET_ALL_GAMES_SUCCESS:
      action.game.key = action.key;

      if (state.data.find(x => x.key === action.key)) {
        return {
          data: state.data.map(game => {
            if (game.key !== action.key) {
              return game;
            }
            return action.game;
          }),
          status: Status.Loaded
        };
      } else {
        return {
          data: [...state.data, action.game],
          status: Status.Loaded
        };
      }
    case actions.UPDATE_GAME_SUCCESS:
      return {
        status: Status.Loaded,
        data: state.data.map(game => {
          if (game.key !== action.updatedGame.key) {
            return game;
          }
          return action.updatedGame;
        })
      };
    case actions.DELETE_GAME_SUCCESS:
      return {
        ...state,
        data: state.data.filter(game => game.key !== action.key)
      };
    case actions.RESET:
      return defaultState;
    default:
      return state;
  }
}

export const gameSelector = createFeatureSelector<GameState>('game');
