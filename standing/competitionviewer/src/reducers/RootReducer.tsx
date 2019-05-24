import { combineReducers } from "redux";
import { selectedRoundReducer } from "./SelectedRoundReducer";

export const rootReducer = combineReducers({
    selectedRound: selectedRoundReducer
});
