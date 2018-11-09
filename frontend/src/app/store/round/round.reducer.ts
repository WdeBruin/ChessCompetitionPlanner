import { createFeatureSelector } from '@ngrx/store';
import { Status } from '../../shared';
import { RoundState } from './';
import * as actions from './round.actions';

export function RoundReducer(
  state: RoundState = { data: [], status: undefined },
  action: actions.RoundActions) {
  switch (action.type) {
    case actions.GET_ROUNDS:
    case actions.UPDATE_ROUND:
    case actions.DELETE_ROUND:
      return {
        ...state,
        status: Status.Loading
      }
    case actions.ROUND_ERROR:
      return {
        ...state,
        status: Status.Error
      }
    case actions.GET_ROUNDS_SUCCESS:
      action.round.key = action.key

      if (state.data.find(x => x.key === action.key)) {
        return {
          data: state.data.map(round => {
            if (round.key !== action.key) {
              return round;
            }
            return action.round;
          }),
          status: Status.Loaded
        }
      } else {
        return {
          data: [...state.data, action.round],
          status: Status.Loaded
        }
      }
    case actions.UPDATE_ROUND_SUCCESS:
      return {
        ...state,
        status: Status.Loaded,
        data: state.data.map(round => {
          if (round.key !== action.updatedRound.key) {
            return round;
          }
          return action.updatedRound;
        })
      }
    default:
      return state;
  }
}

export const roundSelector = createFeatureSelector<RoundState>('round');
