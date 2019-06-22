import { ClubState, Club } from './club.interface';
import { createFeatureSelector } from '@ngrx/store';
import { Status } from '../../shared';
import * as clubActions from './club.actions';

export function ClubReducer(
  state: ClubState = { data: [] as Club[], status: undefined },
  action: clubActions.ClubActions): ClubState {
  switch (action.type) {
    case clubActions.GET_CLUBS:
    case clubActions.UPDATE_CLUB:
      return {
        ...state,
        status: Status.Loading
      };
    case clubActions.CLUB_ERROR:
      return {
        ...state,
        status: Status.Error
      };
    case clubActions.GET_CLUBS_SUCCESS:
      action.club.key = action.key;
      if (state.data.find(x => x.key === action.key)) {
        return {
          data: state.data.map(club => {
            if (club.key !== action.key) {
              return club;
            }
            return action.club;
          }),
          status: Status.Loaded
        };
      } else {
        return {
          data: [...state.data, action.club],
          status: Status.Loaded
        };
      }
    case clubActions.UPDATE_CLUB_SUCCESS:
      return {
        status: Status.Loaded,
        data: state.data.map(club => {
          if (club.key !== action.updatedClub.key) {
            return club;
          }
          return action.updatedClub;
        })
      };
    default:
      return state;
  }
}

export const clubSelector = createFeatureSelector<ClubState>('club');
