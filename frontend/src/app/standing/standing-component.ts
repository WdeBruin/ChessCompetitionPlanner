import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate.interface';
import * as actions from '../store/player/player.actions';
import * as fromPlayer from '../store/player/player.reducer';
import * as fromStanding from '../store/standing/standing.reducer';
import * as fromStandingLine from '../store/standing-line/standing-line.reducer';
import { Player } from 'src/app/store/player/player.interface';
import { Standing } from 'src/app/store/standing/standing.interface';
import { StandingLine } from 'src/app/store/standing-line/standing-line.interface';

@Component({
    templateUrl: "standing-component.html",
    selector: "standing-component"
})
export class StandingComponent implements OnInit {
    standing: Standing;
    standingLines: StandingLine[];
    players: Player[];
    public displayedColumns = ["position", "playerId", "competitionPoints"]

    constructor(private store: Store<fromPlayer.State>) { }

    ngOnInit(): void {
        this.store.select(fromStanding.selectAll).subscribe(x => this.standing = x.find(s => s.isSelected));
        this.store.select(fromStandingLine.selectAll).subscribe(x => this.standingLines = x.filter(s => s.standingId == this.standing.id)
        .sort((a,b) => b.competitionPoints - a.competitionPoints));
        this.store.select(fromPlayer.selectAll).subscribe(x => this.players = x);
    }

    getName(playerId: number): string {
        let player = this.players.find(x => x.id == playerId);
        return `${player.firstName} ${player.lastName}`;
    }
}