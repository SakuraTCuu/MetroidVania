export interface FrameInfo {
    id: number,
    res: string, //资源路径
    width: number,
    height: number,
    once_width: number, //单图宽度
    once_height: number, //单图高度
    actionName: string, //动作名
    total_frame: number, // 共几帧图片
    damage_frame: Array<number>, //伤害帧
}

export class Config {
    public static Action: Record<string, FrameInfo> = {
        "attack": {
            id: 1,
            res: "hero/frame/attack.png", //资源路径
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
            res: "hero/frame/attack2.png", //资源路径
            width: 720,
            height: 80,
            once_width: 120,
            once_height: 80,
            total_frame: 6,
            actionName: "attack2", //动作名
            damage_frame: [1, 2], //伤害帧
        },
    }
}