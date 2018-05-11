// import { CompetitionState } from './competition.interface';
// import { CompetitionActionTypes, CompetitionActionsUnion } from './competitions.actions';
// import { Action } from '@ngrx/store';
// import { StandingState, StandingLine } from '../standings/standing.interface';
// import { RoundState } from '../rounds/round.interface';
// import { Player } from 'src/app/shared/player';
// import { RoundStatus } from 'src/app/store/rounds/round-status.enum';

// let defaultState = [
//     <CompetitionState> {
//         id: 0,
//         isSelected: true,
//         name: "Winter 2018",
//         rounds: [
//             <RoundState>{
//                 id: 0,
//                 isSelected: false,
//                 roundStatus: RoundStatus.PlayerSelect,
//                 roundNumber: 1,
//                 games: [],
//                 playersInRound: [],
//                 standing: <StandingState>{
//                     id: 0,
//                     competitionId: 0,
//                     roundNumber: 1,                    
//                     standingLines: <StandingLine[]>[
//                         <StandingLine>{
//                             player: <Player>{
//                                 firstName: "Player",
//                                 lastName: "1"
//                             },
//                             position: 3
//                         },
//                         <StandingLine>{
//                             player: <Player>{
//                                 firstName: "Player",
//                                 lastName: "2"
//                             },
//                             position: 2
//                         },
//                         <StandingLine>{
//                             player: <Player>{
//                                 firstName: "Player",
//                                 lastName: "3"
//                             },
//                             position: 1
//                         }]
//                 }
//             }
//         ]
//     }
// ];

// export function CompetitionsReducer(state: CompetitionState[] = defaultState, action: CompetitionActionsUnion): CompetitionState[] {
//     switch (action.type) {
//         case CompetitionActionTypes.SELECT_ROUND:
//             return {
//                 ...state,
                                
//             };      
//         default:
//             return state;
//     }
// }