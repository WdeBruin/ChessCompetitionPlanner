import * as actions from './competition.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Competition } from './competition.interface';

// Entity adapter
export const competitionAdapter = createEntityAdapter<Competition>();
export interface State extends EntityState<Competition> { }

// Default data / initial state
const defaultCompetition = {}
export const initialState: State = competitionAdapter.getInitialState(defaultCompetition);

// Reducer
export function CompetitionReducer(
    state: State = initialState,
    action: actions.CompetitionActions) {

    switch (action.type) {
        case actions.GET_COMPETITIONS_SUCCESS:
            return competitionAdapter.addAll(action.competitions, state);

        case actions.GET_COMPETITION_BY_ID_SUCCESS:
            action.competition.isSelected = true;
            return competitionAdapter.addOne(action.competition, state);

        case actions.CREATE_COMPETITION_SUCCESS:
            return competitionAdapter.addOne(action.competition, state);

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