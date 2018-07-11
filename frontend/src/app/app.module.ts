import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatIconModule, MatButtonModule, MatCardModule 
 , MatInputModule, MatListModule, MatTableModule, MatToolbarModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard-component';
import { PlayersComponent } from './players/players-component';
import { RoundComponent } from './round/round-component';
import { CompetitionComponent } from './competition/competition-component';
import { appReducer } from './store/appstate.reducer';
import { PlayerFormComponent } from './players/player-form/player-form.component';
import { StandingComponent } from './standing/standing-component';
import { PlayerEffects } from './store/player/player.effects';
import { PlayerService } from './shared/player.service';
import { CompetitionSelectComponent } from './competition-select/competition-select.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CompetitionFormComponent } from './competition-select/competition-form/competition-form.component';
import { CompetitionService } from './shared/competition.service';
import { CompetitionEffects } from './store/competition/competition.effects';
import { RoundService } from './shared/round.service';
import { RoundEffects } from './store/round/round.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersComponent,
    PlayerFormComponent,
    RoundComponent,
    CompetitionComponent,
    StandingComponent,
    CompetitionSelectComponent,
    CompetitionFormComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot(
      [
        PlayerEffects,
        CompetitionEffects,
        RoundEffects
      ]
    ),
  ],
  providers: [
    PlayerService,
    CompetitionService,
    RoundService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
