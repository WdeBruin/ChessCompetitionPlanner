import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, PlayersComponent, CompetitionSelectComponent } from './';
import { LoginComponent } from './login/login.component';
import { CompetitionComponent } from './competition';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'competition', component: CompetitionSelectComponent },
  { path: 'competition/:id', component: CompetitionComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
