import { PlayerState } from './player';
import { CompetitionState } from './competition';
import { RoundState } from './round';
import { StandingLineState } from './standing-line';
import { GameState } from './game';
import { ClubState } from './club';
import { UserState } from './user';

export interface IAppState {
    player: PlayerState;
    competition: CompetitionState;
    round: RoundState;
    standingLine: StandingLineState;
    game: GameState;
    club: ClubState;
    user: UserState;
}
