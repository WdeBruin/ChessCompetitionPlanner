import { Player } from "../../shared/player";

export interface GameState {
    id: number;
    whitePlayer: Player,
    blackPlayer: Player,
    result: number // 0, 0.5, 1 like normal chess
}