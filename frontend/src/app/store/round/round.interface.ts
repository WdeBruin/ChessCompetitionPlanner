import { RoundStatus } from "./round-status.enum";
import { Status } from "../../shared";

export interface Round {
    key: string;
    competitionKey: string;
    roundNumber: number;
    playersInRoundIds: string;
    playerVrijgeloot: string;
    isSelected: boolean;
    roundStatus: RoundStatus;
}

export interface RoundState {
    data: Round[],
    status: Status
}
