import { EntityState } from '@ngrx/entity/src/models';
import * as fromPlayer from '../store/player/player.reducer';
import * as fromCompetition from '../store/competition/competition.reducer';
import * as fromRound from '../store/round/round.reducer';

export interface AppState {
    player: fromPlayer.State,
    competition: fromCompetition.State,
    round: fromRound.State,
}