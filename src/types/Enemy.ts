import { Scenario } from './Scenario'
import { CharacterProperties } from './CharacterProperties'
import { Character } from './Character'

export class Enemy extends Character {
    constructor(props: CharacterProperties) {
        super(props)
    }

    startTurn(scenario: Scenario): Enemy {
        if(this.stats.energy === 0) {
            this.rest()
            return this
        }
        
        let attackIndex: number = 0
        this.attack(this.attacks[attackIndex], scenario.getPlayer())

        return this
    }
}