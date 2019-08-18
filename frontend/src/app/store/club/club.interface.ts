import { Status } from '../../shared';

export interface Club {
    key: string;
    name?: string;
    adminEmails: string[];
}

export interface ClubState {
    data: Club[];
    status: Status;
}
