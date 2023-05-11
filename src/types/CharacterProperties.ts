import { Attack } from './Attack'

export interface CharacterProperties {
    name: string,
    rank: string,
    attacks: Attack[],
    stats: {
        hp: number,
        energy: number,
        strength: number,
    }
}    