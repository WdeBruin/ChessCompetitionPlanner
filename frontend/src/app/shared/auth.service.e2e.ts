import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User, Roles } from './user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  public user$: BehaviorSubject<User> = new BehaviorSubject(null);
  public loggedIn: boolean = true;
  public isAdmin: boolean = true;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.user$.subscribe((user) => {
      this.isAdmin = user !== null && user.roles !== null && user.roles.admin === true;
      this.loggedIn = user !== null && user !== undefined;
    });
  }

  signInWithGoogle() {
    this.user$.next(
      <User>{
        email: 'test@test.nl',
        roles: <Roles>{
          admin: true,
          reader: true
        }
      });
    this.router.navigate(['players']);
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() => {
        this.user$.next(null);
        this.router.navigate(['/']);
      });
  }

  loginIfNotLoggedIn() {
    if (!this.loggedIn) {
      this.signInWithGoogle();
    }
  }
}
