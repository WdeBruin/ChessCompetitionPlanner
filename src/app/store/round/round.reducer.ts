import * as actions from './round.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Round } from './round.interface';

// Entity adapter
export const roundAdapter = createEntityAdapter<Round>();
export interface State extends EntityState<Round> { }

// Default data / initial state
const defaultRound = {
  ids: [],
  entities: {
  }
}

export const initialState: State = roundAdapter.getInitialState(defaultRound);

// Reducer

export function RoundReducer(
  state: State = initialState,
  action: actions.RoundActions) {

  switch (action.type) {
    case actions.CREATE_ROUND:
      action.round.id = state.ids.length;
      action.round.roundNumber = getRoundNumber(state, action.round.competitionId)
      return roundAdapter.addOne(action.round, state);

    case actions.UPDATE_ROUND:
      return roundAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);

    case actions.DELETE_ROUND:
      return roundAdapter.removeOne(action.id, state)

    default:
      return state;
  }
}

// Create the default selectors
export const getRoundState = createFeatureSelector<State>('round');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = roundAdapter.getSelectors(getRoundState);

function getRoundNumber(state: State, competitionId: number): number {
  let counter = 1;
  for(let i = 0; i < state.ids.length; i += 1) {
    if (state.entities[i].competitionId === competitionId)
      counter += 1;
  }
  return counter;
}