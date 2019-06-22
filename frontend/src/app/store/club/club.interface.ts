import { Status } from '../../shared';

export interface Club {
    key: string;
    name?: string;
}

export interface ClubState {
    data: Club[];
    status: Status;
}
