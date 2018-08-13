import { Status } from '../../shared';

export interface Competition {
    id: number,
    name?: string,
    roundCount: number,
    isSelected: boolean    
}

export interface CompetitionState {
    data: Competition[],
    status: Status
}
