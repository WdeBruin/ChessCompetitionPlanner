import { Status } from '../../shared';

export interface StandingLine {
    key: string;
    competitionKey: string;
    roundNumber: number;
    playerKey: string;
    competitionPoints: number;
}

export interface StandingLineState {
    status: Status;
    data: StandingLine[];
}
