import { createFeatureSelector } from '@ngrx/store';
import { UserState } from './';
import * as actions from './user.actions';
import { User } from '../../shared/user.model';

export function UserReducer(
  state: UserState,
  action: actions.UserActions): UserState {

  switch (action.type) {
    case actions.LOGIN:
      return {
        data: {
          email: action.user.email,
          roles: undefined
        }
      };
    default:
      return state;
  }
}

export const userSelector = createFeatureSelector<UserState>('user');
