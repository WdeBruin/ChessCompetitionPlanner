import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard-component';
import { PlayersComponent } from './players/players-component';
import { CompetitionComponent } from './competition/competition-component';
import { RoundComponent } from './round/round-component';
import { CompetitionSelectComponent } from './competition-select/competition-select.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'competition', component: CompetitionSelectComponent },
  { path: 'competition/:id', component: CompetitionComponent },
  { path: 'competition/round', component: RoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
