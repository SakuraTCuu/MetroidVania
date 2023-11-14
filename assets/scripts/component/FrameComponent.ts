import { _decorator, CCBoolean, CCInteger, Component, game, Node, rect, resources, size, Size, Sprite, SpriteFrame, v2 } from 'cc';
import { FrameInfo } from '../common/ConfigMgr';
const { ccclass, property } = _decorator;

/**
 * 帧动画控件
 */
@ccclass('FrameComponent')
export class FrameComponent extends Component {

    @property({
        type: SpriteFrame
    })
    frameSprite: SpriteFrame = null;

    @property({
        type: CCInteger,
        displayName: "帧率"
    })
    frame: number = 24;

    @property({
        type: Size,
        displayName: "单图尺寸"
    })
    perFrameSize: Size = size(120, 80);

    @property({
        type: CCBoolean
    })
    autoPlay: boolean = false;

    private onceWidth: number = 0;
    private onceHeight: number = 0;
    private perTime: number = 2;
    private startTime: number = 0;
    private frameIndex: number = 0;
    private frameCount = 0;

    private defaultFrame: number = 24;

    private sprite: Sprite = null;

    start() {
        let height = this.frameSprite.height
        let width = this.frameSprite.width

        this.defaultFrame = this.frame;

        this.frameCount = width / this.perFrameSize.width;
        this.onceWidth = this.perFrameSize.width;
        this.onceHeight = this.perFrameSize.height;

        this.perTime = Number(game.frameRate) / this.frame;

        this.initSpriteFrame(this.frameSprite);
    }

    initSpriteFrame(spf: SpriteFrame) {
        this.sprite = this.node.getComponent(Sprite);
        if (!this.sprite) {
            this.sprite = this.node.addComponent(Sprite)
        }
        this.sprite.spriteFrame = spf
        this.sprite.spriteFrame.rect = rect(0, 0, this.onceWidth, this.onceHeight)
    }

    private reset(info: FrameInfo) {
        this.defaultFrame = this.frame;
        this.frameCount = info.width / info.once_width;
        this.onceWidth = info.once_width;
        this.onceHeight = info.once_height;
        this.perTime = Number(game.frameRate) / this.frame;

        this.startTime = 0;
    }

    update(dt: number) {
        if (!this.frameSprite) {
            return
        }
        if (!this.autoPlay) {
            return
        }
        if (this.startTime < this.perTime) {
            this.startTime++;
            return
        }
        this.startTime = 0;
        this.frameIndex++;
        this.frameIndex %= this.frameCount;

        let x = this.frameIndex * this.onceWidth
        this.sprite.spriteFrame.rect = rect(x, 0, this.onceWidth, this.onceHeight)
        this.sprite.markForUpdateRenderData(true)
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
     * 播放一个动作
     */
    public playOnceAction(info: FrameInfo) {
        //加载一个
        if (!info) {
            console.log("无效的info", info)
            return;
        }
        let res_path = info.res_path;

        this.reset(info);
        resources.load(res_path, SpriteFrame, null, (err, spriteFrame) => {
            if (err) {
                console.log(err)
                return;
            }
            this.initSpriteFrame(spriteFrame);
        });
    }
}

