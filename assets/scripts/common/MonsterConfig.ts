import { Monster } from "../Role/monster/Monster";

export class MonsterConfig {
    private static readonly monsterData: { [key: number]: MonsterData } = {
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

    public static createMonster(monsterId: number): Monster {
        const monsterData = this.monsterData[monsterId];
        if (!monsterData) {
            console.error(`Monster with ID ${monsterId} does not exist in the configuration.`);
            return null;
        }

        return new Monster(
            monsterData.id,
            monsterData.hpMax,
            monsterData.attackPower,
            monsterData.spellStrength,
            monsterData.physicalDefense,
            monsterData.magicResistance,
            monsterData.moveSpeed
            // 添加其他属性...
        );
    }
}

