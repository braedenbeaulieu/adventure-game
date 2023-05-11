import { Player } from '../types/Player'

export interface GameSaveData {
    player?: Player,
    currentCampaign?: string,
    currentScenario?: number,
    currentRoom?: number,
}