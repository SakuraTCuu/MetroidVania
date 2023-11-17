import { FrameInfo, HeroAttr } from "./Constant"

export class ConfigMgr {

    public static heroAttr: HeroAttr = {
        hp_max: 1000, //最大血量
        attack_p: 30, //攻击力
        spell_s: 0, //法强
        def_p: 30,  // 护甲
        def_s: 30, // 魔法抗性
        move_speed: 10, // 移动速度
        crit_rate: 0, // 暴击率
        crit_ratio: 100, //爆伤
        vampire: 0, //吸血
    }

    public static heroAction: Record<string, FrameInfo> = {
        "attack": {
            id: 0,
            res_path: "hero/frame/attack/spriteFrame", //资源路径
            width: 480,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 4,
            actionName: "attack", //动作名
            damage_frame: [1, 2], //伤害帧
        },
        "attack2": {
            id: 1,
            res_path: "hero/frame/attack2/spriteFrame", //资源路径
            width: 720,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 6,
            actionName: "attack2", //动作名
            damage_frame: [2, 3], //伤害帧
        },
        "attackCombo": {
            id: 2,
            res_path: "hero/frame/attackCombo/spriteFrame", //资源路径
            width: 1200,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 10,
            actionName: "attackCombo", //动作名
            damage_frame: [1, 2, 6, 7], //伤害帧
        },
        "attackComboNoMovement": {
            id: 3,
            res_path: "hero/frame/attackComboNoMovement/spriteFrame", //资源路径
            width: 1200,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 10,
            actionName: "attackComboNoMovement", //动作名
            damage_frame: [1, 2, 6, 7], //伤害帧
        },
        "attack2NoMovement": {
            id: 4,
            res_path: "hero/frame/attack2NoMovement/spriteFrame", //资源路径
            width: 720,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 6,
            actionName: "attack2NoMovement", //动作名
            damage_frame: [1, 2], //伤害帧
        },
        "crouch": {
            id: 5,
            res_path: "hero/frame/crouch/spriteFrame", //资源路径
            width: 120,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 1,
            actionName: "crouch", //动作名
            damage_frame: [1, 2], //伤害帧
        },
        "crouchAttack": {
            id: 6,
            res_path: "hero/frame/crouchAttack/spriteFrame", //资源路径
            width: 480,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 4,
            actionName: "crouchAttack", //动作名
            damage_frame: [1, 2], //伤害帧
        },
        "crouchWalk": {
            id: 7,
            res_path: "hero/frame/crouchWalk/spriteFrame", //资源路径
            width: 960,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 8,
            actionName: "crouchWalk", //动作名
            damage_frame: [], //伤害帧
        },
        "death": {
            id: 8,
            res_path: "hero/frame/death/spriteFrame", //资源路径
            width: 1200,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 10,
            actionName: "death", //动作名
            damage_frame: [], //伤害帧
        },
        "deathNoMovement": {
            id: 9,
            res_path: "hero/frame/deathNoMovement/spriteFrame", //资源路径
            width: 1200,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 10,
            actionName: "deathNoMovement", //动作名
            damage_frame: [], //伤害帧
        },
        "idle": {
            id: 11,
            res_path: "hero/frame/idle/spriteFrame", //资源路径
            width: 1200,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 10,
            actionName: "idle", //动作名
            damage_frame: [], //伤害帧
        },
        "jump": {
            id: 12,
            res_path: "hero/frame/jump/spriteFrame", //资源路径
            width: 360,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 3,
            actionName: "jump", //动作名
            damage_frame: [], //伤害帧
        },
        "roll": {
            id: 13,
            res_path: "hero/frame/roll/spriteFrame", //资源路径
            width: 1440,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 12,
            actionName: "roll", //动作名
            damage_frame: [], //伤害帧
        },
        "run": {
            id: 14,
            res_path: "hero/frame/run/spriteFrame", //资源路径
            width: 1200,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 10,
            actionName: "run", //动作名
            damage_frame: [], //伤害帧
        },
        "slideAll": {
            id: 15,
            res_path: "hero/frame/slideAll/spriteFrame", //资源路径
            width: 480,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 4,
            actionName: "slideAll", //动作名
            damage_frame: [], //伤害帧
        },
        "wallClimb": {
            id: 16,
            res_path: "hero/frame/wallClimb/spriteFrame", //资源路径
            width: 840,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 7,
            actionName: "wallClimb", //动作名
            damage_frame: [], //伤害帧
        },
        "wallClimbNoMovement": {
            id: 17,
            res_path: "hero/frame/wallClimbNoMovement/spriteFrame", //资源路径
            width: 840,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 7,
            actionName: "wallClimbNoMovement", //动作名
            damage_frame: [], //伤害帧
        },
        "wallSlide": {
            id: 18,
            res_path: "hero/frame/wallSlide/spriteFrame", //资源路径
            width: 360,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 3,
            actionName: "wallSlide", //动作名
            damage_frame: [], //伤害帧
        },
        "turnAround": {
            id: 19,
            res_path: "hero/frame/turnAround/spriteFrame", //资源路径
            width: 360,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 3,
            actionName: "turnAround", //动作名
            damage_frame: [], //伤害帧
        },
        "slideTransitionStart": {
            id: 20,
            res_path: "hero/frame/slideTransitionStart/spriteFrame", //资源路径
            width: 120,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 1,
            actionName: "slideTransitionStart", //动作名
            damage_frame: [], //伤害帧
        },
        "slideTransitionEnd": {
            id: 21,
            res_path: "hero/frame/slideTransitionEnd/spriteFrame", //资源路径
            width: 120,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 1,
            actionName: "slideTransitionEnd", //动作名
            damage_frame: [], //伤害帧
        },
        "slide": {
            id: 22,
            res_path: "hero/frame/slide/spriteFrame", //资源路径
            width: 240,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 2,
            actionName: "slide", //动作名
            damage_frame: [], //伤害帧
        },
        "jumpFallInbetween": {
            id: 23,
            res_path: "hero/frame/jumpFallInbetween/spriteFrame", //资源路径
            width: 240,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 2,
            actionName: "jumpFallInbetween", //动作名
            damage_frame: [], //伤害帧
        },
        "wallHang": {
            id: 24,
            res_path: "hero/frame/wallHang/spriteFrame", //资源路径
            width: 120,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 1,
            actionName: "wallHang", //动作名
            damage_frame: [], //伤害帧
        },

    }

    public static enemyAction: Record<string, FrameInfo> = {

    }
}