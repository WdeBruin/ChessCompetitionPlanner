import { Component, OnInit, Input } from '@angular/core' ;
import { Observable } from 'rxjs/Observable';
// import { PlayerState } from '../store/players/player.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate.interface';
import { debug } from 'util';
import { MatSelectionList } from '@angular/material';
import { RoundState } from 'src/app/store/rounds/round.interface';
import { RoundStatus } from 'src/app/store/rounds/round-status.enum';

@Component({
    selector: 'round-component',
    templateUrl: "round-component.html"
})
export class RoundComponent implements OnInit {
    // players$: Observable<PlayerState[]>;
    showPlayerSelect: boolean = true;
    round$: Observable<RoundState>;

    public roundStatus = RoundStatus;

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        // this.players$ = this.store.select(s => s.players);        
        // this.round$ = this.store.select(s => s.competitions.find(c => c.isSelected)
        // .rounds.find(r => r.isSelected));
        // do something with selectedcompetition and round, in state?
    }

    generateRound(players: MatSelectionList): void {                        
        // here action for generating round based on round state        
    }

    toggle(playerId: number) {
        // here action for adding a player to the round
        console.log(playerId);
    }
}