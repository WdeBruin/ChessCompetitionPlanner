import { ClubEffects } from './store/club/club.effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CompetitionComponent, CompetitionFormComponent, CompetitionSelectComponent, DashboardComponent, PlayerFormComponent,
  PlayersComponent, RoundComponent, ToolbarComponent, ClubFormComponent, ClubSelectComponent } from './';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { AuthGuard, AuthService } from './shared';
import { appReducer, CompetitionEffects, GameEffects, IAppState, PlayerEffects, RoundEffects, StandingLineEffects } from './store';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersComponent,
    PlayerFormComponent,
    RoundComponent,
    CompetitionComponent,
    CompetitionSelectComponent,
    CompetitionFormComponent,
    ToolbarComponent,
    LoginComponent,
    ClubFormComponent,
    ClubSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
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
        StandingLineEffects,
        ClubEffects
      ]
    ),
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
