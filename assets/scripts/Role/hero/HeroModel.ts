interface DefaultAttributes {
    hp: number;
    mp: number;
    // 其他默认属性...
}

interface StaticAttributes {
    baseAttackPower: number;
    baseDefense: number;
    // 其他静态属性...
}

interface DynamicAttributes {
    gold: number;
    // 其他动态属性...
}

interface CombatAttributes {
    currentHP: number;
    currentMP: number;
    currentAttackPower: number;
    currentDefense: number;
    // 其他战斗属性...
}
export default class HeroModel {

    private static defaultAttributes: DefaultAttributes = {
        hp: 100,
        mp: 50,
        // 其他默认属性...
    };

    private static staticAttributes: StaticAttributes = {
        baseAttackPower: 10,
        baseDefense: 5,
        // 其他静态属性...
    };

    private dynamicAttributes: DynamicAttributes = {
        gold: 0,
        // 其他动态属性...
    };

    private combatAttributes: CombatAttributes = {
        currentHP: 100,
        currentMP: 50,
        currentAttackPower: 10,
        currentDefense: 5,
        // 其他战斗属性...
    };

    public getDefaultAttributes(): DefaultAttributes {
        return { ...HeroModel.defaultAttributes };
    }

    public getStaticAttributes(): StaticAttributes {
        return { ...HeroModel.staticAttributes };
    }

    public getDynamicAttributes(): DynamicAttributes {
        return { ...this.dynamicAttributes };
    }

    public getCombatAttributes(): CombatAttributes {
        return { ...this.combatAttributes };
    }

    // ... 其他方法 ...
}
