import { RoundStatus } from "./round-status.enum";
import { Status } from "../../shared";

export interface Round {
    id: number;
    competitionId: number;
    roundNumber: number;
    playersInRoundIds: string;
    playerVrijgeloot: number;
    isSelected: boolean;
    roundStatus: RoundStatus;
}

export interface RoundState {
    data: Round[],
    status: Status
}
