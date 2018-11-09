import { createFeatureSelector } from '@ngrx/store';
import { Status } from '../../shared';
import { StandingLineState } from './';
import * as actions from './standing-line.actions';

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
      action.standingLine.key = action.key

      if (state.data.find(x => x.key === action.key)) {
        return {
          data: state.data.map(standingLine => {
            if (standingLine.key !== action.key) {
              return standingLine;
            }
            return action.standingLine;
          }),
          status: Status.Loaded
        }
      } else {
        return {
          data: [...state.data, action.standingLine],
          status: Status.Loaded
        }
      }
    case actions.UPDATE_STANDING_LINE_SUCCESS:
      return {
        status: Status.Loaded,
        data: state.data.map(standingLine => {
          if (standingLine.key !== action.updatedStandingLine.key) {
            return standingLine;
          }
          return action.updatedStandingLine;
        })
      }
    case actions.DELETE_STANDING_LINE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(standingLine => standingLine.key !== action.key)
      }
    default:
      return state;
  }
}

export const standingLineSelector = createFeatureSelector<StandingLineState>('standingLine');
