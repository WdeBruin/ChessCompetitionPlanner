import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatTableModule, MatToolbarModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IAppState, appReducer, PlayerEffects, CompetitionEffects, RoundEffects, GameEffects, StandingEffects, StandingLineEffects } from './store';
import { PlayerService, CompetitionService, RoundService, GameService, StandingService, StandingLineService } from './shared';
import { DashboardComponent, PlayersComponent, PlayerFormComponent, RoundComponent, CompetitionComponent, StandingComponent, CompetitionSelectComponent, CompetitionFormComponent, ToolbarComponent } from './';

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
    StoreModule.forRoot<IAppState>(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot(
      [
        PlayerEffects,
        CompetitionEffects,
        RoundEffects,
        GameEffects,
        StandingEffects,
        StandingLineEffects
      ]
    ),
  ],
  providers: [
    PlayerService,
    CompetitionService,
    RoundService,
    GameService,
    StandingService,
    StandingLineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
