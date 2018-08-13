import { createFeatureSelector } from '@ngrx/store';
import * as actions from './competition.actions';
import { CompetitionState } from './';
import { Status } from '../../shared';

export function CompetitionReducer(
    state: CompetitionState,
    action: actions.CompetitionActions): CompetitionState {
    switch (action.type) {
        case actions.GET_COMPETITIONS:
        case actions.UPDATE_COMPETITION:
        case actions.DELETE_COMPETITION:
            return {
                ...state,
                status: Status.Loading
            }
        case actions.COMPETITION_ERROR:
            return {
                ...state,
                status: Status.Error
            }
        case actions.GET_COMPETITIONS_SUCCESS:
            return { 
                data: action.competitions,
                status: Status.Loaded
            }        
        case actions.CREATE_COMPETITION_SUCCESS:
            return {
                status: Status.Loaded,
                data: [
                    ...state.data,
                    action.competition
                ]
            }
        case actions.UPDATE_COMPETITION_SUCCESS:
            return {
                status: Status.Loaded,
                data: state.data.map(competition => {
                        if (competition.id !== action.updatedCompetition.id) {
                          return competition;
                        }
                        return action.updatedCompetition;
                      })
                
            }
        case actions.DELETE_COMPETITION_SUCCESS:
            return {
                status: Status.Loaded,
                data: state.data.filter(competition => competition.id !== action.id)                
            }
        default:
            return state;
    }
}

export const competitionSelector = createFeatureSelector<CompetitionState>('competition');
