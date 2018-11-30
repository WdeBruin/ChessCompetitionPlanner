import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from './user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null)
  userDetails: User;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(user => {
      this.updateUser(user);
      this.router.navigate(['competition']);
    })
  }

  isLoggedIn() {
    if (this.userDetails === null) {
      return false;
    } else {
      return true;
    }
  }

  isAdmin() {
    if (this.userDetails === null || this.userDetails.roles.admin === null || this.userDetails.roles.admin === false) {
      return false;
    }
    if (this.userDetails.roles.admin === true) {
      return true;
    }    
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() => {
        this.user.next(null);
        this.router.navigate(['/']);
      });
  }

  private updateUser(authData) {
    const userData = new User(authData);
    const ref = this.db.object<User>(`users/${authData.user.uid}`);
    ref.valueChanges().pipe(
      tap(user => {   
        this.user.next(user);     
        if(user === null) {
          ref.update(userData);
          this.user.next(userData);
        }
      })
    ).subscribe();
  }
}
