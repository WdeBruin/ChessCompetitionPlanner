import { CompetitionState, Competition } from './competition.interface';
import { createFeatureSelector } from '@ngrx/store';
import { Status } from '../../shared';
import * as competitionActions from './competition.actions';

const defaultState = { data: [] as Competition[], status: undefined }

export function CompetitionReducer(
  state: CompetitionState = defaultState,
  action: competitionActions.CompetitionActions): CompetitionState {
  switch (action.type) {
    case competitionActions.GET_COMPETITIONS:
    case competitionActions.UPDATE_COMPETITION:
      return {
        ...state,
        status: Status.Loading
      };
    case competitionActions.COMPETITION_ERROR:
      return {
        ...state,
        status: Status.Error
      };
    case competitionActions.GET_COMPETITIONS_SUCCESS:
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
    case competitionActions.UPDATE_COMPETITION_SUCCESS:
      return {
        status: Status.Loaded,
        data: state.data.map(competition => {
          if (competition.key !== action.updatedCompetition.key) {
            return competition;
          }
          return action.updatedCompetition;
        })
      };
    case competitionActions.RESET:
      return defaultState;
    default:
      return state;
  }
}

export const competitionSelector = createFeatureSelector<CompetitionState>('competition');
