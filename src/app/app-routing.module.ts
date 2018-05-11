import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard-component';
import { PlayersComponent } from './players/players-component';
import { CompetitionComponent } from './competition/competition-component';
import { RoundComponent } from './round/round-component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },  
  { path: 'competition', component: CompetitionComponent },  
  { path: 'competition/round', component: RoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
