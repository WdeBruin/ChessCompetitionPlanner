import * as actions from './player.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Player } from 'src/app/store/player/player.interface';

// Entity adapter
export const playerAdapter = createEntityAdapter<Player>();
export interface State extends EntityState<Player> { }

// Default data / initial state
const defaultPlayer = {
  ids: [0, 1, 2, 3],
  entities: {
    0: {
      id: 0,
      firstName: "Jan",
      lastName: "Steen",
      clubElo: 1000
    },
    1: {
      id: 1,
      firstName: "Jaap",
      lastName: "Schaar",
      clubElo: 900
    },
    2: {
      id: 2,
      firstName: "Henk",
      lastName: "Verhaag",
      clubElo: 400
    },
    3: {
      id: 3,
      firstName: "Piet",
      lastName: "Paal",
      clubElo: 650
    }
  }
}

export const initialState: State = playerAdapter.getInitialState(defaultPlayer);

// Reducer

export function PlayerReducer(
  state: State = initialState,
  action: actions.PlayerActions) {

  switch (action.type) {

    case actions.CREATE_PLAYER:
      action.player.id = state.ids.length;
      return playerAdapter.addOne(action.player, state);

    case actions.UPDATE_PLAYER:
      return playerAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);

    case actions.DELETE_PLAYER:
      return playerAdapter.removeOne(action.id, state)

    default:
      return state;
  }
}

// Create the default selectors
export const getPlayerState = createFeatureSelector<State>('player');

export const {
    selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  } = playerAdapter.getSelectors(getPlayerState);