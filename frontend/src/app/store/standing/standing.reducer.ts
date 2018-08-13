import { createFeatureSelector } from '@ngrx/store';
import * as actions from './standing.actions';
import { StandingState } from './';
import { Status } from '../../shared';

export function StandingReducer(
  state: StandingState = { data: [], status: undefined },
  action: actions.StandingActions) {
  switch (action.type) {
    case actions.GET_STANDINGS:
    case actions.UPDATE_STANDING:
    case actions.DELETE_STANDING:
      return {
        ...state,
        status: Status.Loading
      }
    case actions.STANDING_ERROR:
      return {
        ...state,
        status: Status.Error
      }
    case actions.GET_STANDINGS_SUCCESS:
      return {
        status: Status.Loaded,
        data: [
          action.standings
        ]
      }
    case actions.CREATE_STANDING_SUCCESS:      
      return {
        status: Status.Loaded,
        data: [
          ...state.data,
          action.standing
        ]
      }
    case actions.UPDATE_STANDING_SUCCESS:
      return {
        status: Status.Loaded,
        data: state.data.map(standing => {
          if (standing.id !== action.updatedStanding.id) {
            return standing;
          }
          return action.updatedStanding;
        })
      }      
    case actions.DELETE_STANDING_SUCCESS:
      return {
        ...state,
        data: state.data.filter(standing => standing.id !== action.id)
      }    
    default:
      return state;
  }
}

export const standingSelector = createFeatureSelector<StandingState>('standing');
