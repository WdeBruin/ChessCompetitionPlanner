import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { Standing, StandingLine, Player, IAppState, standingSelector, standingLineSelector, playerSelector } from '../store';

@Component({
    templateUrl: "standing.component.html",
    selector: "standing-component"
})
export class StandingComponent implements OnInit {
    standing: Standing;
    standingLines: StandingLine[];
    players: Player[];
    public displayedColumns = ["position", "playerId", "competitionPoints"]

    constructor(private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.store.select(standingSelector).select(s => s.data).pipe(
            tap(standings => this.standing = standings.find(s => s.isSelected))   
        );

        this.store.select(standingLineSelector).select(s => s.data).pipe(
            tap(standingLines => this.standingLines = standingLines.filter(s => s.standingId == this.standing.id)
            .sort((a,b) => b.competitionPoints - a.competitionPoints))            
        );
        
        this.store.select(playerSelector).select(p => p.data).pipe(
            tap(players => this.players = players)
        );
    }

    getName(playerId: number): string {
        let player = this.players.find(x => x.id == playerId);
        return `${player.firstName} ${player.lastName}`;
    }
}