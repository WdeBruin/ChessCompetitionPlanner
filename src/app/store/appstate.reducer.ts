import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./appstate.interface";
import { PlayerReducer } from "./player/player.reducer";
// import { CompetitionsReducer } from './competitions/competitions.reducer'

export const appReducer: ActionReducerMap<AppState> = {
    player: PlayerReducer    
};
