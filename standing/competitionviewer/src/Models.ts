export interface Player {
    key: string;
    firstName: string;
    lastName: string;
    clubElo: number;
}

export interface StandingLine {
    key: string;
    competitionKey: string;
    roundNumber: number;
    playerKey: string;

    points: number;
    gamesPlayed: number;
    win: number;
    draw: number;
    loss: number;
    percentage: number;
    wp: number;
    sb: number;
}

export interface Game {
    key: string;
    roundNumber: number;

    competitionKey: string;
    whitePlayerKey: string;
    blackPlayerKey: string;

    result: number; // 0, 0.5, 1 like in chess
    whiteWinEloChange: number;
    whiteDrawEloChange: number;
    whiteLossEloChange: number;
    blackWinEloChange: number;
    blackDrawEloChange: number;
    blackLossEloChange: number;
}

export interface WinLossStandingLine {
    playerName: string;
    delta: number;
}
