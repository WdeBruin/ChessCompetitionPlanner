import { Action } from '@ngrx/store';

export const LOGIN = '[User] Login';
export const LOGIN_REDIRECT = '[User] Login redirect';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public readonly user: firebase.User) { }
}

export type UserActions
  = Login;
