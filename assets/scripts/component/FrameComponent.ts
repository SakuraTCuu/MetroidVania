import { FrameInfo } from '../common/Constant';
import { ConfigMgr } from '../common/ConfigMgr';
import { SpriteFrame, Sprite, game, rect, resources, Component, _decorator } from 'cc';
import { UITransform } from 'cc';
import { v2 } from 'cc';
const { ccclass, property } = _decorator;

export interface FrameActExt {
    actName?: string;
    flag_onceAct?: boolean; //播放一次 or 循环
    flag_preAct?: boolean; //播放一次完是播放上一个或者播放默认动作
    onEndFrameFunc?: (baseInfo?: FrameInfo) => void; //结束回调
    onKeyFrameFunc?: (baseInfo?: FrameInfo) => void; //关键帧回调
}

/**
 * 帧动画控件
 */

@ccclass('FrameComponent')
export class FrameComponent extends Sprite {
    /**默认动作 */
    private defaultAct: string = "idle";
    /**自动播放 */
    private autoPlay: boolean = true;
    /**24张图为1s */
    private frame: number = 24;
    private defaultFrame: number = 24;

    /**单图宽高 */
    private onceWidth: number = 0;
    private onceHeight: number = 0;

    /**每一张图显示的时长, 帧为单位 */
    private perTime: number = 2;
    private startTime: number = 0;
    /**当前帧的index */
    private frameIndex: number = 0;
    private frameCount = 0;

    //上一个的动作的信息
    private preFrameActExt: FrameActExt = null
    //当前动作的信息
    private curFrameActExt: FrameActExt = {
        actName: "idle"
    };;

    /**
     * 播放历史
     */
    private historyArr: Array<FrameActExt> = [];

    /**
     * 当前播放动画的基础数据
     */
    private baseInfo: FrameInfo = null;

    init() {
        this.trim = false;
        this.playDefaultAction()
    }

    /**
     * 重设spf
     * @param spf 
     */
    resetSpf(spf: SpriteFrame) {
        // spf.offset = v2()
        spf.packable = false;
        this.trim = false;
        this.spriteFrame = spf
        this.spriteFrame.rect = rect(0, 0, this.onceWidth, this.onceHeight)
        let uiTrans = this.node.getComponent(UITransform);
        uiTrans.setContentSize(this.baseInfo.width, this.baseInfo.height);
    }

    private resetInfo(info: FrameInfo) {
        let uiTrans = this.node.getComponent(UITransform);
        uiTrans.setContentSize(info.width, info.height);

        this.frameCount = info.width / info.once_width;
        this.onceWidth = info.once_width;
        this.onceHeight = info.once_height;
        this.perTime = Number(game.frameRate) / this.frame * (1 / Number(game.frameRate));
        // this.perTime *= 40
        this.startTime = 0;
        this.frameIndex = 0;

        this.baseInfo = info;
    }

    update(dt: number) {
        if (!this.spriteFrame) {
            return
        }
        if (!this.autoPlay) {
            return
        }
        if (this.startTime < this.perTime) {
            this.startTime += dt;
            return
        }
        this.startTime = 0;
        this.frameIndex++;

        if (this.baseInfo.damage_frame.includes(this.frameIndex)) {
            this.curFrameActExt.onKeyFrameFunc && this.curFrameActExt.onKeyFrameFunc(this.baseInfo);
        }

        if (this.frameIndex >= this.frameCount) {
            this.curFrameActExt.onEndFrameFunc && this.curFrameActExt.onEndFrameFunc(this.baseInfo);

            if (this.curFrameActExt.flag_onceAct) {
                if (this.curFrameActExt.flag_preAct) {
                    this.playPreAction()
                    return;
                }
                this.playDefaultAction()
                return;
            }
        }

        let index = this.frameIndex % this.frameCount;

        let x = index * this.onceWidth
        this.spriteFrame.rect = rect(x, 0, this.onceWidth, this.onceHeight)
        this.markForUpdateRenderData(true)
    }

    //记录第几帧, 向外发送事件, 外部关心当前动画到第几帧了
    public getFrameIndex() {
        return this.frameIndex
    }

    /**
     * 减缓播放帧率 被减速了? 减缓动画速度
     * @param slowRate 减速比例百分数: 例如: 50%, 30%
     */
    public setSlowState(slowRate) {
        if (slowRate > 1 || slowRate < 0) {
            console.log(`非法的减速:${slowRate}`)
            return
        }
        if (slowRate === 0) {
            this.frame = this.defaultFrame;
        } else {
            this.frame = this.frame * (1 - slowRate)
        }
        this.perTime = Number(game.frameRate) / this.frame;
    }

    /**
     * 
     * @param actName 
     * @param ext 
     * @returns 
     */
    private async playAction(actName: string, ext: FrameActExt) {
        console.log("playAct=>", actName)

        //判断是否是重复
        //如果重复动作,停止
        if (this.curFrameActExt.actName === actName) {
            return;
        }

        let info = ConfigMgr.getHeroAction(actName)
        //加载一个
        if (!info) {
            console.log("无效的info", info)
            return false;
        }

        let res_path = info.res_path;

        let spf = await this.getRes(res_path)
        if (!spf) {
            console.log("资源未找到:", res_path)
            return false;
        }

        this.resetInfo(info);
        this.resetSpf(spf);

        this.preFrameActExt = this.curFrameActExt;
        this.curFrameActExt = ext;
        return true;
    }

    /**
     * 播放一个动作
     */
    public async playOnceAction(actName: string | FrameActExt, ext?: FrameActExt) {
        if (typeof (actName) === "string") {
            ext = ext || {}
        } else {
            ext = actName || {}
        }
        let flag = await this.playAction(ext.actName, ext)
        if (flag) {
            this.historyArr.push(ext)
        }
    }

    /**
     * 播放上一个动作
     */
    public async playPreAction() {
        let flag = await this.playAction(this.preFrameActExt.actName, this.preFrameActExt)
        if (flag) {
            this.historyArr.push(this.preFrameActExt)
        }
    }

    /**
     * 播放默认动作
     */
    public async playDefaultAction() {
        let flag = await this.playAction(this.defaultAct, { actName: this.defaultAct })
        if (flag) {
            this.historyArr.push({ actName: this.defaultAct })
        }
    }

    private async getRes(resPath: string) {
        return new Promise<SpriteFrame>((resolve, reject) => {
            resources.load(resPath, SpriteFrame, null, (err, spriteFrame) => {
                resolve(spriteFrame)
                if (err) {
                    console.log(err)
                    return;
                }
            });
        })
    }

}

