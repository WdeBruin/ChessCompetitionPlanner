import { createFeatureSelector } from '@ngrx/store';
import { Status } from '../../shared';
import { RoundState } from './';
import * as roundActions from './round.actions';

export function RoundReducer(
  state: RoundState = { data: [], status: undefined },
  action: roundActions.RoundActions) {
  switch (action.type) {
    case roundActions.GET_ROUNDS:
    case roundActions.UPDATE_ROUND:
    case roundActions.DELETE_ROUND:
      return {
        ...state,
        status: Status.Loading
      };
    case roundActions.ROUND_ERROR:
      return {
        ...state,
        status: Status.Error
      };
    case roundActions.GET_ROUNDS_SUCCESS:
      action.round.key = action.key;

      if (state.data.find(x => x.key === action.key)) {
        return {
          data: state.data.map(round => {
            if (round.key !== action.key) {
              return round;
            }
            return action.round;
          }),
          status: Status.Loaded
        };
      } else {
        return {
          data: [...state.data, action.round],
          status: Status.Loaded
        };
      }
    case roundActions.UPDATE_ROUND_SUCCESS:
      return {
        ...state,
        status: Status.Loaded,
        data: state.data.map(round => {
          if (round.key !== action.updatedRound.key) {
            return round;
          }
          return action.updatedRound;
        })
      };
    default:
      return state;
  }
}

export const roundSelector = createFeatureSelector<RoundState>('round');
