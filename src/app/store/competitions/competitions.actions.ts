import { Action } from '@ngrx/store';

export enum CompetitionActionTypes {
    ADD_COMPETITION = '[Competitions] Add competition',
    SELECT_ROUND = '[Competitions] Select round'
}

export class AddCompetition implements Action {
    readonly type = CompetitionActionTypes.ADD_COMPETITION;

    constructor() { }
}

export class SelectRound implements Action {
    readonly type = CompetitionActionTypes.SELECT_ROUND;

    constructor(roundNumber: number) { }
}

export type CompetitionActionsUnion = 
AddCompetition |
SelectRound;