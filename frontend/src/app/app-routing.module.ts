import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, PlayersComponent, CompetitionSelectComponent, CompetitionComponent } from './';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'competition', component: CompetitionSelectComponent },
  { path: 'competition/:id', component: CompetitionComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
