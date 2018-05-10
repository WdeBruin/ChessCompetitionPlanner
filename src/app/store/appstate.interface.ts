import { PlayerState } from './players/player.interface'

export interface AppState {
    players: PlayerState[],
    //competitions: CompetitionState[]
}