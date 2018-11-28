import { PlayerState } from './player';
import { CompetitionState } from './competition';
import { RoundState } from './round';
import { StandingLineState } from './standing-line';
import { GameState } from './game';

export interface IAppState {
    player: PlayerState;
    competition: CompetitionState;
    round: RoundState;
    standingLine: StandingLineState;
    game: GameState;
}
