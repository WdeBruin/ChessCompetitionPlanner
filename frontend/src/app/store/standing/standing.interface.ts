import { Status } from "../../shared";

export interface Standing {
    id: number;
    competitionId: number;
    roundNumber: number;   
    
    isSelected: boolean;
}

export interface StandingState{
    status: Status,
    data: Standing[]
}
