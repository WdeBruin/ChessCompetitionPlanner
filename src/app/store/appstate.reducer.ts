import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./appstate.interface";
import { PlayerReducer } from "./player/player.reducer";
import { RoundReducer } from "./round/round.reducer";
import { CompetitionReducer } from "src/app/store/competition/competition.reducer";

export const appReducer: ActionReducerMap<AppState> = {
    player: PlayerReducer,
    competition: CompetitionReducer,
    round: RoundReducer  
};
