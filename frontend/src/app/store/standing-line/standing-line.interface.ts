import { Status } from "../../shared";

export interface StandingLine {
    id: number;
    standingId: number;
    position: number | undefined;    
    playerId: number;
    competitionPoints: number;    
}

export interface StandingLineState {
    status: Status,
    data: StandingLine[]
}
