import * as actions from './player.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Player } from './player.interface';

// Entity adapter
export const playerAdapter = createEntityAdapter<Player>();
export interface State extends EntityState<Player> { }

// Default data / initial state
const defaultPlayer = { }
export const initialState: State = playerAdapter.getInitialState(defaultPlayer);

export function PlayerReducer(
  state: State = initialState,
  action: actions.PlayerActions) {

  switch (action.type) {
    case actions.GET_PLAYERS_SUCCESS:
     return playerAdapter.addAll(action.players, state);
    
    case actions.CREATE_PLAYER_SUCCESS:      
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