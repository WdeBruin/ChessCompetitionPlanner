import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./appstate.interface";
import { PlayersReducer } from "./players/players.reducer";

export const appReducer: ActionReducerMap<AppState> = {
    players: PlayersReducer
};