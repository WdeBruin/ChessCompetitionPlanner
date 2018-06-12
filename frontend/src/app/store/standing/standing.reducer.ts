import * as actions from './standing.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Standing } from './standing.interface';

// Entity adapter
export const standingAdapter = createEntityAdapter<Standing>();
export interface State extends EntityState<Standing> { }

// Default data / initial state
const defaultStanding = {
  ids: [],
  entities: {
  }
}

export const initialState: State = standingAdapter.getInitialState(defaultStanding);

// Reducer

export function StandingReducer(
  state: State = initialState,
  action: actions.StandingActions) {

  switch (action.type) {
    case actions.CREATE_STANDING:
      action.standing.id = state.ids.length;      
      return standingAdapter.addOne(action.standing, state);

    case actions.UPDATE_STANDING:
      return standingAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);

    case actions.DELETE_STANDING:
      return standingAdapter.removeOne(action.id, state)

    default:
      return state;
  }
}

// Create the default selectors
export const getStandingState = createFeatureSelector<State>('standing');

export const {
    selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  } = standingAdapter.getSelectors(getStandingState);
