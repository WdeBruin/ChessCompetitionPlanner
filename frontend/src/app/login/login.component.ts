import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private authService: AuthService) {
  }

  signInWithGoogle() {
    return this.authService.signInWithGoogle();
  }
}
