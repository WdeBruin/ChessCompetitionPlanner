import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from './user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, tap, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  public user$: BehaviorSubject<User> = new BehaviorSubject(null)
  public loggedIn: boolean;
  public isAdmin: boolean;

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
      this.router.navigate(['competition']);
    })
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
    ).subscribe();
  }
}
