export interface Game {
    id: number;
    roundId: number;
    competitionId: number;
    whitePlayerId: number;
    blackPlayerId: number;
    
    result: number; // 0, 0.5, 1 like in chess
    whiteWinEloChange: number;
    whiteDrawEloChange: number;
    whiteLossEloChange: number;
    blackWinEloChange: number;
    blackDrawEloChange: number;
    blackLossEloChange: number;
    
    whiteWinCpChange: number;
    whiteDrawCpChange: number;
    whiteLossCpChange: number;
    blackWinCpChange: number;
    blackDrawCpChange: number;
    blackLossCpChange: number;    
}