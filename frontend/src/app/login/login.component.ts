import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public model: Credentials = {
    username: "",
    password: ""
  };

  ngOnInit(): void {    
  }

  constructor(private userService: UserService, private router: Router) {       
  }  

  login() {    
    this.userService.login(this.model).subscribe(
        res => {
            localStorage.setItem('auth_token', res.auth_token);
            this.router.navigate(['competition']);
        }
    )
  }
}

export class Credentials {
  public username: string;
  public password: string
}