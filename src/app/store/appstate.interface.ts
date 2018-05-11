import { CompetitionState } from './competitions/competition.interface';
import { RoundState } from 'src/app/store/rounds/round.interface';
import { EntityState } from '@ngrx/entity/src/models';
import * as fromPlayer from '../store/player/player.reducer';


export interface AppState {
    player: fromPlayer.State,
    // competitions: CompetitionState,
    // rounds: RoundState[],
}