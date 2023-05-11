import { CampaignProperties } from './CampaignProperties'
import { Scenario } from './Scenario'
// import { Player } from './Player'
// import { Enemy } from './Enemy'

export class Campaign {
    title: string
    currentScenario: number
    scenarios: Scenario[]

    constructor(props: CampaignProperties) {
        this.title = props.title
        this.scenarios = props.scenarios
        this.currentScenario = 0
    }
}