import { director, game } from "cc";
import { MonsterConfig } from "../common/MonsterConfig";
import { Monster } from "../Role/monster/Monster";
import { Director } from "cc";

export default class MonsterCtrl {

    private static instance: MonsterCtrl;

    public static getInstance(): MonsterCtrl {
        if (!this.instance) {
            this.instance = new MonsterCtrl()
        }
        return this.instance;
    }

    private monsterList: Array<Monster> = []

    constructor() {
        // TimerCtrl.getInstance().startTimer(game.frameTime / 1000, this.onTick)
        director.on(Director.EVENT_BEFORE_UPDATE, (dt) => {
            this.onTick(dt)
        });
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

    public getMonsterById(monsterId: number): Array<Monster> {
        let arr = this.monsterList.filter(item => {
            return item.getModal().Id === monsterId
        })
        return arr;
    }

    public getMonsterByUid(uid: string): Monster {
        let arr = this.monsterList.filter(item => {
            return item.getUid() === uid
        })
        return arr[0];
    }

    /**
     * TODO: 每一个怪物都需要唯一id标识,删除时,应该传入唯一id 进行, 而非怪物id, 
     * 有可能同一怪物id有多个副本对应
     * @param monsterId 
     */
    public removeMonster(uid: string): void {
        let monster: Monster;
        for (let i = 0; i < this.monsterList.length; i++) {
            if (this.monsterList[i].getUid() === uid) {
                monster = this.monsterList.splice(i, 1)[0]
                break;
            }
        }
        monster.destroy()
    }
}