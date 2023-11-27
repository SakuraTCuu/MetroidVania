import { Size } from "cc";

export enum Layer {
    SCENE = 0, //场景层
    ROLE = 10, //角色层
    EFFECT = 11, //特效层
    UI = 20, //UI层
    VIEW = 30, //View层
    MASK = 40, //遮罩层
    GUIDE = 50,// 引导层
    TOP = 60, //最顶层
}
export interface FrameInfo {
    id: number,
    res_path: string, //资源路径
    width: number,
    height: number,
    once_width: number, //单图宽度
    once_height: number, //单图高度
    actionName: string, //动作名
    total_frame: number, // 共几帧图片
    damage_frame: Array<number>, //伤害帧
}

export interface BaseAttr { //基础属性
    hp_max: number; //最大血量
    attack_p: number; //攻击力
    spell_s: number; //法强
    def_p: number;  // 护甲
    def_s: number; // 魔法抗性
    move_speed: number; // 移动速度
}

export interface NormalEnemyAttr extends BaseAttr {
    visitor_size: Size; //巡视领地的范围
    visitor_speed: number;//巡视领地的速度
    visitor_time: number; //多久检测一下领地是否有敌人
}

export interface MonsterAttr {
    id: number;
    name: string;
    hpMax: number;
    attackPower: number;
    spellStrength: number;
    physicalDefense: number;
    magicResistance: number;
    moveSpeed: number;
    // 添加其他属性...
}

export interface HeroAttr extends BaseAttr {
    // hp: number; //血量
    crit_rate: number; // 暴击率
    crit_ratio: number; //爆伤
    vampire: number; //吸血
}