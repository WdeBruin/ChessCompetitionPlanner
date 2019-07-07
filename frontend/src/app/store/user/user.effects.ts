import { User } from './../../shared/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as userActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private router: Router, private db: AngularFirestore) {
  }

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions.pipe(
    ofType<userActions.Login>(userActions.LOGIN),
    tap(
      action => {
        this.db.doc(`users/${action.user.uid}`).set({ email: action.user.email } as User).then(() => {
          // this.router.navigate(['club']);
        });
      }
    )
  );
}
