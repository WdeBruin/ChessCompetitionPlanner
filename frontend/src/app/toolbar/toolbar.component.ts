import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../shared';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input()
  public name: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
