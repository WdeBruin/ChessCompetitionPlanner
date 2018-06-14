import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../store/competition/competition.actions';
import * as fromCompetition from '../../store/competition/competition.reducer';
import { OnInit } from '@angular/core';
import { Competition } from 'src/app/store/competition/competition.interface';

@Component({
  selector: 'competition-form',
  templateUrl: './competition-form.component.html',
})
export class CompetitionFormComponent implements OnInit {
  public model: Competition = {
    id: 0,
    isSelected: false,
    name: undefined,
    roundCount: 0
  };

  ngOnInit(): void {    
  }

  constructor(private store: Store<fromCompetition.State>) { }  

  save() {    
    this.store.dispatch(new actions.Create(this.model));  
    this.model = {
      id: 0,
      isSelected: false,
      name: undefined,
      roundCount: 0
    }
  }
}