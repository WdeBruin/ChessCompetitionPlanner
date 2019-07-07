import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { IAppState } from '../store';
import * as userActions from '../store/user/user.actions';
import { userSelector } from '../store/user';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user: User;

  constructor(private _firebaseAuth: AngularFireAuth, private store: Store<IAppState>, private router: Router) {
    this.store.select(userSelector).pipe(tap(val => this.user = val.data));
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then((userCredential: firebase.auth.UserCredential) => {
      this.store.dispatch(new userActions.Login(userCredential.user));
      this.router.navigate(['club']);
    });
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  loginIfNotLoggedIn() {
    if (!this.user) {
      this.signInWithGoogle();
    }
  }

  isLoggedIn() {
    return true;
  }
}
