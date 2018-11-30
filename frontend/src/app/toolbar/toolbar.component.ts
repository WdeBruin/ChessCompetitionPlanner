import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../shared';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input()
  public name: string;

  public loggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn$ = this.authService.user.pipe(
      tap(u => console.log(u)),
      map(u => u !== undefined && u !== null)
      )
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
