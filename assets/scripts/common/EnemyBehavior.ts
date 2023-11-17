import { macro } from "cc";
import TimeCtrl from "../controller/TimeCtrl";
import { Behavior } from "./Behavior";
import { NormalEnemyAttr } from "./Constant";

/**
 * 普通怪物的行为树
 */
export default class EnemyBehavior extends Behavior {

    // //所有动作列表
    // private action: Array<string> = []
    // //约束列表
    // //某些动作不能直接转换的动作列表,比如 死亡状态不能直接转换为射击动作,
    // private constraint: Record<string, Array<string>> = {}

    // //当前执行的动作
    // private curActionName: string = ""

    // //执行动作时的回调
    // private callback: Function = null;
    /**
      * 开始状态 Idle
      * 每隔10帧检测一次领地范围
      * 当有玩家进入领地范围, 即开始追逐
      */

    private baseInfo: NormalEnemyAttr = null;

    /**
     * 设置一些基础属性,和怪物相关的属性
     */
    public setData(info: NormalEnemyAttr) {
        this.baseInfo = info;
    }

    /**
     * 触发一次检测
     */
    public tick() {
       //英雄是否在范围内
    }

    /**
     * 开始活动
     */
    public startLife() {
        let time = this.baseInfo.visitor_time;
        TimeCtrl.instance.add(this.tick.bind(this), this, time, macro.REPEAT_FOREVER)
    }
}