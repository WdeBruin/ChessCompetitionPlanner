import { combineReducers } from 'redux';
import { IState } from '../state/IState';
import { competitionListReducer } from './CompetitionListReducer';

export const rootReducer = combineReducers<IState>({
    competitionList: competitionListReducer, // remove this.
    // playersOfClub
    // roundsOfCompetition
    // gamesOfRound

    // selectedRoundKey
});
