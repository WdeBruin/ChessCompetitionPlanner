import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppState } from '../store';
import { userSelector } from '../store/user';
import * as userActions from '../store/user/user.actions';
import { User } from './user.model';

@Injectable()
export class AuthService {
  private user$: Observable<User>;

  constructor(private _firebaseAuth: AngularFireAuth, private store: Store<IAppState>, private router: Router) {
    this.user$ = this.store.select(userSelector).pipe(map(val => val.data));
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

  isLoggedIn() {
    return this.user$;
  }
}
