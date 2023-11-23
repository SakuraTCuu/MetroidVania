import { MonsterModal } from "../Role/model/MonsterModal";
import { MonsterCtrl } from "../controller/MonsterCtrl";
import { MonsterAttr } from "./Constant";

export class MonsterConfig {
    private static readonly monsterData: { [key: number]: MonsterAttr } = {
        1: {
            id: 1,
            name: "Goblin",
            hpMax: 100,
            attackPower: 20,
            spellStrength: 10,
            physicalDefense: 5,
            magicResistance: 2,
            moveSpeed: 60,
            // 其他属性...
        },
        2: {
            id: 2,
            name: "Orc",
            hpMax: 150,
            attackPower: 30,
            spellStrength: 15,
            physicalDefense: 8,
            magicResistance: 5,
            moveSpeed: 50,
            // 其他属性...
        },
        // 添加更多怪物类型...
    };

    public static getMonsterConfig(monsterId: number): MonsterAttr {
        const monsterData = this.monsterData[monsterId];
        if (!monsterData) {
            console.error(`Monster with ID ${monsterId} does not exist in the configuration.`);
            return null;
        }

        return monsterData 
    }
}

