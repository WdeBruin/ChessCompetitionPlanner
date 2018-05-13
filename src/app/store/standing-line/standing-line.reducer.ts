import * as actions from './standing-line.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { StandingLine } from './standing-line.interface';

// Entity adapter
export const standingLineAdapter = createEntityAdapter<StandingLine>();
export interface State extends EntityState<StandingLine> { }

// Default data / initial state
const defaultStandingLine = {
  ids: [],
  entities: {
  }
}

export const initialState: State = standingLineAdapter.getInitialState(defaultStandingLine);

// Reducer

export function StandingLineReducer(
  state: State = initialState,
  action: actions.StandingLineActions) {

  switch (action.type) {
    case actions.CREATE_STANDING_LINE:
      action.standingLine.id = state.ids.length;      
      return standingLineAdapter.addOne(action.standingLine, state);

    case actions.UPDATE_STANDING_LINE:
      return standingLineAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);

    case actions.DELETE_STANDING_LINE:
      return standingLineAdapter.removeOne(action.id, state)

    default:
      return state;
  }
}

// Create the default selectors
export const getStandingLineState = createFeatureSelector<State>('standingLine');

export const {
    selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  } = standingLineAdapter.getSelectors(getStandingLineState);
