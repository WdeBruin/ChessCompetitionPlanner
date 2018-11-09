import { createFeatureSelector } from '@ngrx/store';
import * as actions from './game.actions';
import { GameState } from './';
import { Status } from '../../shared';

export function GameReducer(
  state: GameState = { data: [], status: undefined },
  action: actions.GameActions) {
  switch (action.type) {
    case actions.GET_ALL_GAMES:    
    case actions.UPDATE_GAME:
    case actions.DELETE_GAME:
      return {
        ...state,
        status: Status.Loading
      }
    case actions.GAME_ERROR:
      return {
        ...state,
        status: Status.Error
      }
    case actions.GET_ALL_GAMES_SUCCESS:
      return {
        status: Status.Loaded,
        data: action.games
      }
    case actions.CREATE_GAME_SUCCESS:      
      return {
        status: Status.Loaded,
        data: [
          ...state.data,
          action.game
        ]
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
      }      
    case actions.DELETE_GAME_SUCCESS:
      return {
        ...state,
        data: state.data.filter(game => game.key !== action.id)
      }    
    default:
      return state;
  }
}

export const gameSelector = createFeatureSelector<GameState>('game');
