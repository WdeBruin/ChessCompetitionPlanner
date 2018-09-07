import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, PlayersComponent, CompetitionSelectComponent, CompetitionComponent } from './';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'competition', component: CompetitionSelectComponent },
  { path: 'competition/:id', component: CompetitionComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
