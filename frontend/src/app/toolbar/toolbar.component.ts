import { Component, Input, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from '../shared';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input()
  public name: string;

  public navigationButtonsEnabled: boolean = true;
  private clubKey;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const clubKey = val.state.root.firstChild.params['clubKey'];

        if (clubKey) {
          this.navigationButtonsEnabled = true;
          this.clubKey = clubKey;
        } else {
          this.navigationButtonsEnabled = false;
          this.clubKey = null;
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  navigate(location: string) {
    if (location === 'competition') {
      this.router.navigate(['club', this.clubKey]);
    } else {
      this.router.navigate(['club', this.clubKey, location]);
    }
  }
}
