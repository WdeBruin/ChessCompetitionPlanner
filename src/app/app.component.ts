import { Component } from '@angular/core';
import { Store} from '@ngrx/store';
import { Observable, pipe } from 'rxjs';

import { AppState } from './store/appstate.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(private store: Store<AppState>){    
  }

  title = 'app';
}
