import { Player } from "../../shared/player";

export interface StandingState {
    id: number;
    competitionId: number;
    roundNumber: number;
    standingLines: StandingLine[]
}

export interface StandingLine {
    position: number;    
    player: Player;
    // ... more stats
}