import { RoundStatus } from "src/app/store/rounds/round-status.enum";

export interface RoundState {
    id: number;
    competitionId: number;
    roundNumber: number;
    playersInRoundIds: number[];
    isSelected: boolean;
    roundStatus: RoundStatus;
}