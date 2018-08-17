import { createFeatureSelector } from '@ngrx/store';
import * as actions from './round.actions';
import { RoundState } from './';
import { Status } from '../../shared';

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
      return {
        status: Status.Loaded,
        data: action.rounds
      }
    case actions.CREATE_ROUND_SUCCESS:      
      return {
        status: Status.Loaded,
        data: [
          ...state.data,
          action.round
        ]
      }
    case actions.UPDATE_ROUND_SUCCESS:
      return {
        status: Status.Loaded,
        data: state.data.map(round => {
          if ((round.competitionId === action.updatedRound.competitionId && round.roundNumber === action.updatedRound.roundNumber)) {
            return action.updatedRound;            
          }
          return round;          
        })
      }      
    case actions.DELETE_ROUND_SUCCESS:
      return {
        ...state,
        data: state.data.filter(round => round.id !== action.id)
      }    
    default:
      return state;
  }
}

export const roundSelector = createFeatureSelector<RoundState>('round');
