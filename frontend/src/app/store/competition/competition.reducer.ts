import * as actions from './competition.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Competition } from './competition.interface';

// Entity adapter
export const competitionAdapter = createEntityAdapter<Competition>();
export interface State extends EntityState<Competition> { }

// Default data / initial state
const defaultCompetition = {
    ids: [0, 1],
    entities: {
        0: {
            id: 0,
            name: "Winter 2018",
            isSelected: false,
            roundCount: 5,
        },
        1: {
            id: 1,
            name: "Voorjaar 2018",
            isSelected: true,
            roundCount: 0
        }
    }
}

export const initialState: State = competitionAdapter.getInitialState(defaultCompetition);

// Reducer
export function CompetitionReducer(
    state: State = initialState,
    action: actions.CompetitionActions) {

    switch (action.type) {
        case actions.CREATE_COMPETITION:
            action.competition.id = state.ids.length;
            return competitionAdapter.addOne(action.competition, state);

        case actions.UPDATE_COMPETITION:
            return competitionAdapter.updateOne({
                id: action.id,
                changes: action.changes,
            }, state);

        case actions.DELETE_COMPETITION:
            return competitionAdapter.removeOne(action.id, state)

        default:
            return state;
    }
}

// Create the default selectors
export const getCompetitionState = createFeatureSelector<State>('competition');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = competitionAdapter.getSelectors(getCompetitionState);