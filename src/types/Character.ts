import { Scenario } from './Scenario'
import { CharacterProperties } from './CharacterProperties'
import { Attack } from './Attack'

export class Character {
    name: string
    rank: string
    attacks: Attack[]
    stats: {
        hp: number,
        energy: number,
        strength: number,
    }
    modifierArray = [-2, -1, -1, 0, 0, 0, 0, 1, 1, 2]

    constructor(props: CharacterProperties) {
        this.name = props.name
        this.rank = props.rank
        this.attacks = props.attacks
        this.stats = props.stats
    }

    rest(): Character {
        this.stats.energy = 10
        this.resetAttackModifiers()
        return this
    }

    getBaseAttack(total: number): number {
        return (total + this.stats.strength) / 10
    }

    getAttackModifier(): number|string {
        let roll = Scenario.rollDice(this.modifierArray.length)
        return this.modifierArray[roll - 1]
    }

    resetAttackModifiers(): void {
        this.modifierArray = [-2, -1, -1, 0, 0, 0, 0, 1, 1, 2]
    }

    getAttackDamage(attack: Attack): number {
        let baseAttack = this.getBaseAttack(attack.damage)
        let modifier = this.getAttackModifier()
        let attackDamage = baseAttack
        if(modifier === 'miss') {
            attackDamage = 0
        } else if(modifier === 'x2') {
            attackDamage = attackDamage * 2
        } else if(typeof modifier === 'string') {
            attackDamage += parseInt(modifier)
        } else {
            attackDamage += modifier
        }

        return attackDamage
    }
    
    attack(attack: Attack, character: Character): Character {
        if(this.stats.energy <= 0 || attack.energyNeeded > this.stats.energy) {
            console.log('cannot attack, must rest')
            return this
        }

        let attackDamage = this.getAttackDamage(attack)
        
        character.stats.hp -= attackDamage

        if(character.stats.hp <= 0) {
            character.stats.hp = 0
        }

        this.stats.energy -= attack.energyNeeded

        
        return this
    }
}