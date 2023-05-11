<template>
    <div id="game-world" class="h-screen w-screen bg-gray-900 text-white">

        <div class="character the-player p-4">
            <h2 class="name">{{ player.name }}</h2>
            <ul class="select-none">
                <li>HP: {{ player.stats.hp }}</li>
                <li>Stats: {{ player.stats }}</li>
            </ul>
        </div>
        <div class="actions flex justify-center gap-4 p-4">
            <button v-for="(attack, i) in player.attacks" :key="i" @click="playerAttack(i)">{{ attack.name }}</button>
            <button @click="playerRest()">Rest</button>
        </div>
        <div>
            <div class="character enemy-goblin p-4" v-for="enemy in enemies">
                <h2 class="name">{{ enemy.name }}</h2>
                <ul class="select-none">
                    <li>HP: {{ enemy.stats.hp }}</li>
                    <li>Stats: {{ enemy.stats }}</li>
                </ul>
            </div>
        </div>

        <div class="game-prompt p-4 flex flex-col items-center justicy-center">
            <p>{{ promptMessage }}</p>
            <button class="p-4" @click="continueGame">Continue</button>
        </div>

        <div class="game-options">
            <button id="save-game">Save Game</button>
            <div class="hidden" id="game-save-data">{{ gameSaveDataString }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { GameSaveData } from '../types/GameSaveData'
    import { Campaign } from '../types/Campaign'
    import { Scenario } from '../types/Scenario'
    import { Player } from '../types/Player'
    import { ref } from 'vue'

    let gameSaveDataString = ref('')

    let campaign
    let scenario = ref<any>(null)
    let player = ref<Player>(new Player({
        name: 'Player',
        rank: 'player',
        attacks: [
            {
                name: 'Swipe',
                initiative: 25,
                energyNeeded: 1,
                damage: 10
            },
            {
                name: 'Judo Kick',
                initiative: 40,
                energyNeeded: 3,
                damage: 35
            },
        ],
        stats: {
            hp: 80,
            energy: 10,
            strength: 50
        }
    }))
    let enemies = ref<any>(null)

    let promptMessage = ref('')

    function nextTurn() {
        if(scenario !== null) {
            scenario.enemyTurn(scenario)
            scenario.checkEnd()
        }
    }

    function playerAttack(attackIndex: number) {
        player.value.attack(player.value.attacks[attackIndex], enemies.value[0])
        nextTurn()
    }

    function playerRest() {
        player.value.rest()
        nextTurn()
    }

    function showPrompt(prompt: string) {
        promptMessage.value = prompt
    }

    function startRoom() {
        let room = scenario.getCurrentRoom()
        showPrompt(room.introduction)
    }

    async function continueGame() {
        console.log('continue game')
        enemies.value = await scenario.getEnemies()
    }

    async function getCampaign() {
        try {
            let campaign_fetch = await fetch('/campaign/campaign1.json')
            let campaign_json = await campaign_fetch.json()
            
            
            campaign = new Campaign(campaign_json)
            let scenarioProps = campaign.scenarios[campaign.currentScenario]
            scenarioProps.player = player.value
            scenario = new Scenario(scenarioProps)

            gameSaveDataString.value = getGameSaveData()
            startRoom()
        } catch(err) {
            console.log(err)
        }
    }
    getCampaign()

    function getGameSaveData(): string {
        const data: GameSaveData = {}

        data['player'] = player.value
        data['currentCampaign'] = campaign.title
        data['currentScenario'] = campaign.currentScenario
        data['currentRoom'] = scenario.getCurrentRoom()

        return JSON.stringify(data)
    }
    
    async function loadGameSaveData() {
        try {

            let gameSaveDataFetch = await fetch('/gamesaves/gameSave.json')
            let gameSaveDataJson = await gameSaveDataFetch.json()
            let data: GameSaveData = JSON.parse(gameSaveDataJson)
            console.log('game save data', data)
            // gameSaveData.value = data
        } catch(err) {
            console.log(err)
        }

    }

    loadGameSaveData()

/**
 * How the game should run:
 */
</script>