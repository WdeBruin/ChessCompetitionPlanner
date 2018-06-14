import { RoundStatus } from "./round-status.enum";

export interface Round {
    id: number;
    competitionId: number;
    roundNumber: number;
    playersInRoundIds: number[];
    playerVrijgeloot: number;
    isSelected: boolean;
    roundStatus: RoundStatus;
}