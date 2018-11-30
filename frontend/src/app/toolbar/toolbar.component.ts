import { Component, Input } from '@angular/core';
import { AuthService } from '../shared';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input()
  public name: string;

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
