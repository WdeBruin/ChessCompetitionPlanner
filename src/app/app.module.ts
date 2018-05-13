import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatIconModule, MatButtonModule, MatCardModule 
 , MatInputModule, MatListModule, MatTableModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard-component';
import { PlayersComponent } from './players/players-component';
import { RoundComponent } from './round/round-component';
import { CompetitionComponent } from './competition/competition-component';
import { appReducer } from './store/appstate.reducer';
import { PlayerFormComponent } from './players/player-form/player-form.component';
import { StandingComponent } from 'src/app/standing/standing-component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersComponent,
    PlayerFormComponent,
    RoundComponent,
    CompetitionComponent,
    StandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
