import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { IAppState } from '../store';
import { userSelector } from '../store/user';
import { User } from './user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<IAppState>) { }

  canActivate() {
    return true;
    // return this.store.select(userSelector).pipe(map(user => user !== undefined));
  }
}
