import { _decorator, CCBoolean, CCInteger, Component, game, Node, rect, size, Size, Sprite, SpriteFrame, v2 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 帧动画控件
 */
@ccclass('Frame')
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
    perFrameSize: Size = size();

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

    private sprite: Sprite = null;

    start() {
        let height = this.frameSprite.height
        let width = this.frameSprite.width

        this.frameCount = width / this.perFrameSize.width;
        this.onceWidth = this.perFrameSize.width;
        this.onceHeight = this.perFrameSize.height;

        this.perTime = Number(game.frameRate) / this.frame;

        this.sprite = this.node.getComponent(Sprite);
        if (!this.sprite) {
            this.sprite = this.node.addComponent(Sprite)
        }
        this.sprite.spriteFrame = this.frameSprite
        this.sprite.spriteFrame.rect = rect(0, 0, this.onceWidth, this.onceHeight)
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
        // console.log(this.frameIndex)
        this.sprite.spriteFrame.rect = rect(x, 0, this.onceWidth, this.onceHeight)
        this.sprite.markForUpdateRenderData(true)
        //丑陋, 后续优化
    }
}

