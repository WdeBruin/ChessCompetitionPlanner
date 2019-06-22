import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class AuthService {
  public user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public loggedIn: boolean;
  public isAdmin: boolean;

  public navigationButtonsEnabled: boolean;
  public clubKey: string;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.user$.subscribe((user) => {
      this.isAdmin = user !== null && user.roles !== null && user.roles.admin === true;
      this.loggedIn = user !== null && user !== undefined;
    });
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(user => {
      this.updateUser(user);
    });
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() => {
        this.user$.next(null);
        this.router.navigate(['/']);
      });
  }

  private updateUser(authData) {
    const userData = new User(authData);
    const ref = this.db.object<User>(`users/${authData.user.uid}`);
    ref.valueChanges().pipe(
      tap(user => {
        this.user$.next(user);
        if (user === null) {
          ref.update(userData);
          this.user$.next(userData);
        }
      })
    ).subscribe(() => this.router.navigate(['club']));
  }

  loginIfNotLoggedIn() {
    if (!this.loggedIn) {
      this.signInWithGoogle();
    }
  }


}
