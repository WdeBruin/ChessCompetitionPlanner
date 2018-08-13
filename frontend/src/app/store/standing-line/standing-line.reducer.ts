import { createFeatureSelector } from '@ngrx/store';
import * as actions from './standing-line.actions';
import { StandingLineState } from './';
import { Status } from '../../shared';

export function StandingLineReducer(
  state: StandingLineState = { data: [], status: undefined },
  action: actions.StandingLineActions) {
  switch (action.type) {
    case actions.GET_STANDING_LINES:
    case actions.UPDATE_STANDING_LINE:
    case actions.DELETE_STANDING_LINE:
      return {
        ...state,
        status: Status.Loading
      }
    case actions.STANDING_LINE_ERROR:
      return {
        ...state,
        status: Status.Error
      }
    case actions.GET_STANDING_LINES_SUCCESS:
      return {
        status: Status.Loaded,
        data: action.standingLines
      }
    case actions.CREATE_STANDING_LINE_SUCCESS:      
      return {
        status: Status.Loaded,
        data: [
          ...state.data,
          action.standingLine
        ]
      }
    case actions.UPDATE_STANDING_LINE_SUCCESS:
      return {
        status: Status.Loaded,
        data: state.data.map(standingLine => {
          if (standingLine.id !== action.updatedStandingLine.id) {
            return standingLine;
          }
          return action.updatedStandingLine;
        })
      }      
    case actions.DELETE_STANDING_LINE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(standingLine => standingLine.id !== action.id)
      }    
    default:
      return state;
  }
}

export const standingLineSelector = createFeatureSelector<StandingLineState>('standingLine');
