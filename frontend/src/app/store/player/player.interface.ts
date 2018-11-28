import { Status } from '../../shared';

export interface Player {
    key: string;
    firstName: string;
    lastName: string;
    clubElo: number;
}

export interface PlayerState {
    data: Player[];
    status: Status;
}
