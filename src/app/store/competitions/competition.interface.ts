import { RoundState } from '../rounds/round.interface';
import { StandingState } from '../standings/standing.interface';

export interface CompetitionState {
    id: number;
    rounds: RoundState[]
    standing: StandingState
}