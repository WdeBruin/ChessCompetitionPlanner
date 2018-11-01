import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatTableModule, MatToolbarModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IAppState, appReducer, PlayerEffects, CompetitionEffects, RoundEffects, GameEffects, StandingLineEffects } from './store';
import { CompetitionService, RoundService, GameService, StandingLineService, UserService } from './shared';
import { DashboardComponent, PlayersComponent, PlayerFormComponent, CompetitionFormComponent, ToolbarComponent } from './';
import { LoginComponent } from './login';
import { TokenInterceptor } from './shared/token.interceptor';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersComponent,
    PlayerFormComponent,
    // RoundComponent,
    // CompetitionComponent,
    // StandingComponent,
    // CompetitionSelectComponent,
    // CompetitionFormComponent,
    ToolbarComponent,
    // LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,    
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
        // CompetitionEffects,
        // RoundEffects,
        // GameEffects,
        // StandingLineEffects
      ]
    ),
  ],
  providers: [
    // CompetitionService,
    // RoundService,
    // GameService,
    // StandingLineService,
    // UserService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
