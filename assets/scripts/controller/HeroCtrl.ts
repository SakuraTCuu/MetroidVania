import { _decorator, Camera, CCInteger, Component, Director, director, EventKeyboard, EventMouse, find, game, gfx, input, Input, KeyCode, Node, RenderTexture, Sprite, SpriteFrame, UITransform, v2, v3, Vec2, Vec3, view } from 'cc';
import { FrameComponent } from '../component/FrameComponent';
import InputCtrl, { KeyEvent } from './InputCtrl';
import app from '../App';
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

    @property({
        type: FrameComponent
    })
    frameCtrl: FrameComponent = null;

    //移动方向
    private moveDirection: Vec2 = v2(0, 0)
    private clickFlag: boolean = true;

    //转身功能
    private flipBody: boolean = false;
    private preDirection: number = null;

    onPressKeyW: KeyEvent = {
        down: () => {
            this.clickFlag = true;
            this.moveDirection = v2(0, 1)
        },
        up: () => {
            this.clickFlag = false;
        }
    };
    onPressKeyS: KeyEvent = {
        down: () => {
            this.clickFlag = true;
            this.moveDirection = v2(0, -1)
        },
        up: () => {
            this.clickFlag = false;
        }
    };
    onPressKeyA: KeyEvent = {
        down: () => {
            this.clickFlag = true;
            this.moveDirection = v2(-1, 0)
            if (this.preDirection === null || this.preDirection === KeyCode.KEY_D) {
                this.flipBody = true;
            }
            this.preDirection = KeyCode.KEY_A
        },
        up: () => {
            this.clickFlag = false;
        }
    };
    onPressKeyD: KeyEvent = {
        down: () => {
            this.clickFlag = true;
            this.moveDirection = v2(1, 0)
            if (this.preDirection === KeyCode.KEY_A) {
                this.flipBody = true;
            }
            this.preDirection = KeyCode.KEY_D
        },
        up: () => {
            this.clickFlag = false;
        }
    };

    onPressKeyCX: KeyEvent = {
        down: (event) => {
            console.log("onPressKeyCX")
        }
    };

    onMouseLeft: KeyEvent = {
        down: () => {
            console.log("onMouseDown")
        },
        up: () => {

        }
    }

    start() {
        //监听键盘事件
        app.inputCtrl
            .add("right", [KeyCode.KEY_D], this.onPressKeyD)
            .add("left", [KeyCode.KEY_A], this.onPressKeyA)
            .add("up", [KeyCode.KEY_W], this.onPressKeyW)
            .add("down", [KeyCode.KEY_S], this.onPressKeyS)
            .addMouse("attack", EventMouse.BUTTON_LEFT, this.onMouseLeft)
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

}