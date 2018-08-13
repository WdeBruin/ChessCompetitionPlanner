import { Status } from "../../shared";

export interface Standing {
    id: number;
    competitionId: number;
    roundId: number;   
    
    isSelected: boolean;
}

export interface StandingState{
    status: Status,
    data: Standing[]
}
