import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent, CompetitionSelectComponent } from './';
import { LoginComponent } from './login/login.component';
import { CompetitionComponent } from './competition';
import { AuthGuard } from './shared';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'players', component: PlayersComponent, canActivate: [ AuthGuard ] },
  { path: 'competition', component: CompetitionSelectComponent, canActivate: [ AuthGuard ] },
  { path: 'competition/:key', component: CompetitionComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
