import { director, game } from "cc";
import { MonsterConfig } from "../common/MonsterConfig";
import TimerCtrl from "./TimerCtrl";
import { Monster } from "../Role/monster/Monster";

export class MonsterCtrl {

    private static instance: MonsterCtrl;

    public static getInstance(): MonsterCtrl {
        if (!this.instance) {
            this.instance = new MonsterCtrl()
        }
        return this.instance;
    }

    private monsterList: Array<Monster> = []

    constructor() {
        TimerCtrl.getInstance().startTimer(game.frameTime / 1000, this.onTick)
    }

    private onTick(dt: number) {
        this.monsterList.forEach(item => item.onTick(dt))
    }

    public createMonster(monsterId: number): Monster {
        const config = MonsterConfig.getMonsterConfig(monsterId);
        if (!config) {
            return null;
        }
        let newMonster = new Monster(config)
        this.monsterList.push(newMonster);
        return newMonster;
    }

    // public getMonsterById(monsterId: number): Monster {
    //     return this.monsters[monsterId];
    // }

    // public removeMonster(monsterId: number): void {
    //     delete this.monsters[monsterId];
    // }
}