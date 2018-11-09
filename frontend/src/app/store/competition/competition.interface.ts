import { Status } from '../../shared';

export interface Competition {
    key: string,
    name?: string,
    roundCount: number,
    isSelected: boolean    
}

export interface CompetitionState {
    data: Competition[],
    status: Status
}
