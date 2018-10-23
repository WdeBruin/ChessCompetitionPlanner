import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StandingLine, Player, IAppState, standingLineSelector, playerSelector } from '../store';


@Component({
    templateUrl: "standing.component.html",
    selector: "standing-component"
})
export class StandingComponent implements OnInit {
    @Input() round;
    
    standingLines$: Observable<StandingLine[]>;
    players: Player[];
    public displayedColumns = ["position", "playerId", "competitionPoints"]

    constructor(private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.standingLines$ = this.store.select(standingLineSelector).select(s => s.data).map(data =>
            data.filter(x => x.competitionId === this.round.competitionId && x.roundNumber === this.round.roundNumber)
            .sort((a,b) => b.competitionPoints - a.competitionPoints));        
        
        this.store.select(playerSelector).select(p => p.data).pipe(
            tap(players => this.players = players)
        ).subscribe();
    }

    getName(playerId: number): string {
        if(this.players && this.players.find(x => x.id == playerId)) {
            let player = this.players.find(x => x.id == playerId);
            return `${player.firstName} ${player.lastName}`;
        }
        return '';
    }
}