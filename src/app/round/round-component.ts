import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate.interface';
import { debug } from 'util';
import { MatSelectionList } from '@angular/material';
import { Round } from 'src/app/store/round/round.interface';
import { RoundStatus } from 'src/app/store/round/round-status.enum';
import * as fromPlayer from '../store/player/player.reducer';
import * as fromRound from '../store/round/round.reducer';
import * as roundActions from '../store/round/round.actions';
import { Player } from 'src/app/store/player/player.interface';

@Component({
    selector: 'round-component',
    templateUrl: "round-component.html"
})
export class RoundComponent implements OnInit {
    players$: Observable<Player[]>;
    selectedRound: Round;
    rounds$: Observable<Round[]>;

    public roundStatus = RoundStatus;

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.players$ = this.store.select(fromPlayer.selectAll);
        this.rounds$ = this.store.select(fromRound.selectAll);
        this.rounds$.subscribe(r =>
            this.selectedRound = r.find(x => x.isSelected) || undefined);
    }

    generateRound(players: MatSelectionList): void {
        // here action for generating round based on round state        
    }

    toggle(playerId: number) {
        // here action for adding a player to the round
        //console.log(playerId);
        let index = this.selectedRound.playersInRoundIds.indexOf(playerId);

        if (index == -1)
            this.selectedRound.playersInRoundIds.push(playerId);
        else           
            this.selectedRound.playersInRoundIds.splice(index, 1);    
        
        this.store.dispatch(new roundActions.Update(this.selectedRound.id, this.selectedRound));
    }
}