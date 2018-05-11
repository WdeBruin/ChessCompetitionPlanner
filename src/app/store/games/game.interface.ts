export interface GameState {
    id: number;
    whitePlayerId: number,
    blackPlayerId: number,
    result: number // 0, 0.5, 1 like in chess
}