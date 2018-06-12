import * as actions from './game.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Game } from 'src/app/store/game/game.interface';

// Entity adapter
export const gameAdapter = createEntityAdapter<Game>();
export interface State extends EntityState<Game> { }

// Default data / initial state
const defaultGame = {
  ids: [],
  entities: {    
  }
}

export const initialState: State = gameAdapter.getInitialState(defaultGame);

// Reducer

export function GameReducer(
  state: State = initialState,
  action: actions.GameActions) {

  switch (action.type) {

    case actions.CREATE_GAME:
      action.game.id = state.ids.length;
      return gameAdapter.addOne(action.game, state);

    case actions.UPDATE_GAME:
      return gameAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);

    case actions.DELETE_GAME:
      return gameAdapter.removeOne(action.id, state)

    default:
      return state;
  }
}

// Create the default selectors
export const getGameState = createFeatureSelector<State>('game');

export const {
    selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  } = gameAdapter.getSelectors(getGameState);