import { Monster } from "../Role/monster/Monster";
import { MonsterConfig } from "../common/MonsterConfig";

export class MonsterCtrl {
    private monsters: { [key: number]: Monster } = {};

    public createMonster(monsterId: number): Monster {
        const newMonster = MonsterConfig.createMonster(monsterId);

        if (newMonster) {
            this.monsters[newMonster.Id] = newMonster;
        }

        return newMonster;
    }

    public getMonsterById(monsterId: number): Monster {
        return this.monsters[monsterId];
    }

    public removeMonster(monsterId: number): void {
        delete this.monsters[monsterId];
    }
}