import { ScenarioProperties } from './ScenarioProperties'
import { Player } from './Player'
import { Enemy } from './Enemy'
import { Room } from './Room'

export class Scenario {
    title: string
    player: Player
    rooms: Room[]
    turn: number
    currentRoom: number
    currentEnemies: Enemy[]|null

    constructor(props: ScenarioProperties) {
        this.title = props.title
        this.player = props.player
        this.rooms = props.rooms
        this.turn = 1
        this.currentRoom = 0
        this.currentEnemies = null
    }

    static rollDice(sides: number): number {
        return Math.floor(Math.random() * sides) + 1
    }

    win(): void {
        console.log('You win!')
        alert('You win!')
    }

    lose(): void {
        console.log('You Lose.')
        alert('You Lose.')
    }
    
    checkEnd(): void | Room {
        if(this.player.stats.hp === 0) {
            this.lose()
            return
        }

        
        if(this.currentEnemies !== null) {
            for(let enemy of this.currentEnemies) {
                console.log(enemy.stats)
                if(enemy.stats.hp > 0) return
            }
        } else {
            return
        }

        this.win()
        return this.getNextRoom()
    }

    getNextRoom(): Room {
        this.currentRoom += 1
        return this.rooms[this.currentRoom]
    }

    getCurrentRoom(): Room {
        return this.rooms[this.currentRoom]
    }

    async getEnemies(): Promise<Enemy[]> {
        if(this.currentEnemies === null) {
            let enemies: Enemy[] = []
            for(let enemy of this.rooms[this.currentRoom].enemies) {
                let enemyName = enemy.rank + enemy.name
                try {
                    let enemyFetch = await fetch(`/enemies/${enemyName}.json`)
                    let enemyJSON = await enemyFetch.json()
            
                    // let enemy = new Enemy(campaignJSON)
                    enemies.push(new Enemy(enemyJSON))
                } catch(err) {
                    console.log(err)
                }
            }
            return enemies
        } else {
            return this.currentEnemies
        }
    }

    async enemyTurn() {
        let enemies = await this.getEnemies()
        for(let enemy of enemies) {
            enemy.startTurn(this)
        }
    }

    getPlayer(): Player {
        return this.player
    }
}