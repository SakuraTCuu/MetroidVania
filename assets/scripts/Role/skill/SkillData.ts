const skillData = [
    {
        "id": 1,
        "name": "Fireball",
        "damageType": "Magical",
        "baseDamage": 50,
        "cooldown": 10,
        "level": 1
        // 其他技能属性...
    },
    {
        "id": 2,
        "name": "Skill2",
        "damageType": "Physical",
        "baseDamage": 60,
        "cooldown": 8,
        "level": 2
        // 其他技能属性...
    },
    {
        "id": 3,
        "name": "Skill3",
        "damageType": "Magical",
        "baseDamage": 70,
        "cooldown": 6,
        "level": 3
        // 其他技能属性...
    },
    {
        "id": 4,
        "name": "Skill4",
        "damageType": "Physical",
        "baseDamage": 80,
        "cooldown": 4,
        "level": 4
        // 其他技能属性...
    },
    {
        "id": 5,
        "name": "Skill5",
        "damageType": "Magical",
        "baseDamage": 90,
        "cooldown": 2,
        "level": 5
        // 其他技能属性...
    },
    {
        "id": 6,
        "name": "Skill6",
        "damageType": "Physical",
        "baseDamage": 100,
        "cooldown": 1,
        "level": 6
        // 其他技能属性...
    },
    {
        "id": 7,
        "name": "Skill7",
        "damageType": "Magical",
        "baseDamage": 110,
        "cooldown": 3,
        "level": 7
        // 其他技能属性...
    },
    {
        "id": 8,
        "name": "Skill8",
        "damageType": "Physical",
        "baseDamage": 120,
        "cooldown": 5,
        "level": 8
        // 其他技能属性...
    },
    {
        "id": 9,
        "name": "Skill9",
        "damageType": "Magical",
        "baseDamage": 130,
        "cooldown": 7,
        "level": 9
        // 其他技能属性...
    },
    {
        "id": 10,
        "name": "Skill10",
        "damageType": "Physical",
        "baseDamage": 140,
        "cooldown": 9,
        "level": 10
        // 其他技能属性...
    },
    {
        "id": 11,
        "name": "Skill11",
        "damageType": "Magical",
        "baseDamage": 30,
        "cooldown": 12,
        "level": 1
        // 其他技能属性...
    },
    {
        "id": 12,
        "name": "Skill12",
        "damageType": "Physical",
        "baseDamage": 40,
        "cooldown": 10.5,
        "level": 1
        // 其他技能属性...
    },
    {
        "id": 13,
        "name": "Skill13",
        "damageType": "Magical",
        "baseDamage": 50,
        "cooldown": 9,
        "level": 1
        // 其他技能属性...
    },
    {
        "id": 14,
        "name": "Skill14",
        "damageType": "Physical",
        "baseDamage": 60,
        "cooldown": 7.5,
        "level": 1
        // 其他技能属性...
    },
    {
        "id": 15,
        "name": "Skill15",
        "damageType": "Magical",
        "baseDamage": 70,
        "cooldown": 6,
        "level": 1
        // 其他技能属性...
    }
]

// 定义伤害类型枚举
enum DamageType {
    Physical,
    Magical,
    // 其他伤害类型...
}

// 定义技能数据接口
interface SkillData {
    id: number;
    name: string;
    damageType: DamageType;
    baseDamage: number;
    cooldown: number;
    level: number;
    // 其他技能属性...
}

interface EffectData {
    id: number;
    name: string;
    duration: number;
    // 其他特效属性...
}

