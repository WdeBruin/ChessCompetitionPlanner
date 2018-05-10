import { Component, OnInit } from '@angular/core' ;
import { Observable } from 'rxjs/Observable';
import { PlayerState } from '../store/players/player.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate.interface';
import { debug } from 'util';
import { MatSelectionList } from '@angular/material';

@Component({
    templateUrl: "competition-component.html"
})
export class CompetitionComponent implements OnInit {
    players$: Observable<PlayerState[]>

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.players$ = this.store.select(s => s.players);
    }

    generateRound(players: MatSelectionList): void {                
        // here action for generating round based on round state        
    }

    toggle(playerId: number) {
        // here action for adding a player to the round
        console.log(playerId);
    }
}