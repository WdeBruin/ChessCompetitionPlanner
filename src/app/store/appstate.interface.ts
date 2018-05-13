import { EntityState } from '@ngrx/entity/src/models';
import * as fromPlayer from '../store/player/player.reducer';
import * as fromCompetition from '../store/competition/competition.reducer';
import * as fromRound from '../store/round/round.reducer';
import * as fromStanding from '../store/standing/standing.reducer';
import * as fromStandingLine from '../store/standing-line/standing-line.reducer';

export interface AppState {
    player: fromPlayer.State,
    competition: fromCompetition.State,
    round: fromRound.State,
    standing: fromStanding.State,
    standingLine: fromStandingLine.State
}