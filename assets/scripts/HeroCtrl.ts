import { _decorator, Camera, CCInteger, Component, Director, director, EventKeyboard, find, game, gfx, input, Input, KeyCode, Node, RenderTexture, Sprite, SpriteFrame, UITransform, v2, v3, Vec2, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HeroCtrl')
export class HeroCtrl extends Component {

    @property({
        type: CCInteger
    })
    MoveSpeed: number = 1;

    @property({
        type: Sprite
    })
    heroSprite: Sprite = null;

    //移动方向
    private moveDirection: Vec2 = v2(0, 0)
    private clickFlag: boolean = true;

    //转身功能
    private flipBody: boolean = false;
    private preDirection: number = null;

    start() {
        //监听键盘事件
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    update(deltaTime: number) {
        if (this.clickFlag) {
            let vDist = this.moveDirection.clone().multiplyScalar(this.MoveSpeed)
            let pos = this.node.getPosition();
            this.node.setPosition(pos.add(v3(vDist.x, vDist.y, 0)))
        }
        if (this.flipBody) {
            let scale = this.node.scale
            this.node.scale = v3(-scale.x, scale.y, scale.z)
            this.flipBody = false;
        }
    }

    private onKeyDown(e: EventKeyboard) {
        this.clickFlag = true;
        switch (e.keyCode) {
            case KeyCode.KEY_A:
                this.moveDirection = v2(-1, 0)
                if (this.preDirection === null || this.preDirection === KeyCode.KEY_D) {
                    this.flipBody = true;
                }
                this.preDirection = KeyCode.KEY_A
                break;
            case KeyCode.KEY_D:
                this.moveDirection = v2(1, 0)
                if (this.preDirection === KeyCode.KEY_A) {
                    this.flipBody = true;
                }
                this.preDirection = KeyCode.KEY_D
                break;
            case KeyCode.KEY_S:
                this.moveDirection = v2(0, -1)
                break;
            case KeyCode.KEY_W:
                this.moveDirection = v2(0, 1)
                break;
            default:
                this.clickFlag = false;
                break;
        }
    }

    private onKeyUp(e: EventKeyboard) {
        this.clickFlag = false;
    }

}