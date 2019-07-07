import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent, CompetitionSelectComponent, CompetitionComponent, ClubSelectComponent } from './';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared';
import { ClubFormComponent } from './club-select';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'club/:clubKey/players', component: PlayersComponent, canActivate: [ AuthGuard ] },
  { path: 'club/:clubKey/competition/:competitionKey', component: CompetitionComponent, canActivate: [ AuthGuard ] },
  { path: 'club', component: ClubSelectComponent, canActivate: [ AuthGuard ] },
  { path: 'club/new', component: ClubFormComponent },
  { path: 'club/:clubKey', component: CompetitionSelectComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
