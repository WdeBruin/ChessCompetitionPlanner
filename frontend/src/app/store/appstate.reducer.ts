import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './appstate.interface';
import { PlayerReducer } from './player';
import { CompetitionReducer } from './competition';
import { RoundReducer } from './round';
import { StandingLineReducer } from './standing-line';
import { GameReducer } from './game';

export const appReducer: ActionReducerMap<IAppState> = {
    player: PlayerReducer,
    competition: CompetitionReducer,
    round: RoundReducer,
    standingLine: StandingLineReducer,
    game: GameReducer
};
