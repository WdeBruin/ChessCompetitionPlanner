import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { StandingLine, Player, IAppState, standingLineSelector, playerSelector } from '../store';


@Component({
  templateUrl: 'standing.component.html',
  selector: 'standing-component',
  styleUrls: ['standing.component.css']
})
export class StandingComponent implements OnInit {
  @Input()
  competitionKey: string;

  @Input()
  roundNumber: number;

  standingLines$: Observable<StandingLine[]>;
  players: Player[];

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.standingLines$ = this.store.select(standingLineSelector).pipe(
      map(r => r.data.filter(standingline => standingline.competitionKey === this.competitionKey
        && standingline.roundNumber === this.roundNumber).sort((a, b) => b.competitionPoints - a.competitionPoints))
    );

    this.store.select(playerSelector).pipe(
      tap(players => this.players = players.data)
    ).subscribe();
  }

  getName(playerKey: string): string {
    if (this.players && this.players.find(x => x.key === playerKey)) {
      const player = this.players.find(x => x.key === playerKey);
      return `${player.firstName} ${player.lastName}`;
    }
    return '';
  }
}
