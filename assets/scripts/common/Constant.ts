export interface BaseAttr { //基础属性
    hp_max: number; //最大血量
    attack_p: number; //攻击力
    spell_s: number; //法强
    def_p: number;  // 护甲
    def_s: number; // 魔法抗性
    move_speed: number; // 移动速度
}

export interface EnemyAttr extends BaseAttr {
   
}

export interface HeroAttr extends BaseAttr {
    // hp: number; //血量
    crit_rate: number; // 暴击率
    crit_ratio: number; //爆伤
    vampire: number; //吸血
}