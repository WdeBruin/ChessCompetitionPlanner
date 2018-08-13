import { Status } from '../../shared';

export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    clubElo: number;
}

export interface PlayerState {
    data: Player[],
    status: Status
}
