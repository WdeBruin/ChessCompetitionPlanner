import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatTableModule, MatToolbarModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IAppState, appReducer, PlayerEffects, CompetitionEffects, RoundEffects, GameEffects, StandingLineEffects } from './store';
import { DashboardComponent, PlayersComponent, PlayerFormComponent, CompetitionFormComponent, ToolbarComponent, CompetitionSelectComponent, CompetitionComponent, RoundComponent } from './';
import { LoginComponent } from './login';
import { environment } from '../environments/environment';
import { AuthService } from './shared/auth.service';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
        StandingLineEffects
      ]
    ),
  ],
  providers: [
    AuthService
    // UserService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
