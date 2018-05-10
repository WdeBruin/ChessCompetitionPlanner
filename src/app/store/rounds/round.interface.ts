import { Player } from "../../shared/player";
import { GameState } from "../games/game.interface";

export interface RoundState {
    id: number;
    roundNumber: number;
    playersInRound: Player[]
    games: GameState[]    
}