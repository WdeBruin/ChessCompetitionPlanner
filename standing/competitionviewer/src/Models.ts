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
