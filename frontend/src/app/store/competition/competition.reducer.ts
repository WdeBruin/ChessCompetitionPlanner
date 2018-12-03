import { createFeatureSelector } from '@ngrx/store';
import { Status } from '../../shared';
import { CompetitionState } from './';
import * as actions from './competition.actions';

export function CompetitionReducer(
    state: CompetitionState = { data: [], status: undefined },
    action: actions.CompetitionActions): CompetitionState {
    switch (action.type) {
        case actions.GET_COMPETITIONS:
        case actions.UPDATE_COMPETITION:
            return {
                ...state,
                status: Status.Loading
            };
        case actions.COMPETITION_ERROR:
            return {
                ...state,
                status: Status.Error
            };
        case actions.GET_COMPETITIONS_SUCCESS:
            action.competition.key = action.key;
            if (state.data.find(x => x.key === action.key)) {
                return {
                    data: state.data.map(competition => {
                        if (competition.key !== action.key) {
                            return competition;
                        }
                        return action.competition;
                    }),
                    status: Status.Loaded
                };
            } else {
                return {
                    data: [...state.data, action.competition],
                    status: Status.Loaded
                };
            }
        case actions.UPDATE_COMPETITION_SUCCESS:
            return {
                status: Status.Loaded,
                data: state.data.map(competition => {
                    if (competition.key !== action.updatedCompetition.key) {
                        return competition;
                    }
                    return action.updatedCompetition;
                })
            };
        default:
            return state;
    }
}

export const competitionSelector = createFeatureSelector<CompetitionState>('competition');
