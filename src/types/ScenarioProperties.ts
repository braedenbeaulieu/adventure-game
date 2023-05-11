import { Player } from './Player'
import { Room } from './Room'

export interface ScenarioProperties {
    title: string,
    player: Player,
    currentRoom: number,
    rooms: Room[]
}