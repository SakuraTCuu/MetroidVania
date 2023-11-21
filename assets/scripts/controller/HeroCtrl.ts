import { _decorator, CCInteger, Component, EventMouse, KeyCode, Sprite, v2, v3, Vec2 } from 'cc';
import { FrameComponent } from '../component/FrameComponent';
import { KeyEvent } from './InputCtrl';
import app from '../App';
import { find } from 'cc';
import { BoxCollider } from 'cc';
import { geometry } from 'cc';
import { BoxCollider2D } from 'cc';
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

    private isShiftPressed: boolean = false;

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

    onMouseDownPlatform: KeyEvent = {
        down: () => {
            this.isShiftPressed = true;
        },
        up: () => {
            this.isShiftPressed = false;
        }
    }


    start() {
        //监听键盘事件
        app.inputCtrl
            .add("right", [KeyCode.KEY_D], this.onPressKeyD)
            .add("left", [KeyCode.KEY_A], this.onPressKeyA)
            .add("up", [KeyCode.KEY_W], this.onPressKeyW)
            .add("down", [KeyCode.KEY_S], this.onPressKeyS)
            .add("down_platform", [KeyCode.KEY_S, KeyCode.SHIFT_LEFT], this.onMouseDownPlatform)
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

    private heroDropLogic() {
        // 获取英雄当前所在平台的信息，可以通过碰撞检测等方式实现
        // 如果英雄在一个平台上，执行掉落逻辑，否则忽略
        const currentPlatform = this.getCurrentPlatform();

        if (currentPlatform) {
            // 执行掉落逻辑，比如修改英雄的位置到下一个平台
            const nextPlatform = this.getNextPlatform(currentPlatform);
            if (nextPlatform) {
                // this.node.position = nextPlatform.position.add(v2(0, currentPlatform.height + 10));
            }
        }
    }

    private getCurrentPlatform() {
        // 获取英雄当前所在平台的逻辑

        // 假设你的平台节点都有 "Platform" 标签
        const platforms = find("Canvas/Platforms").children;

        // let pfmBox = new geometry.AABB
        const heroBoundingBox = this.node.getComponent(BoxCollider2D).worldAABB;

        for (const platform of platforms) {
            const platformBoundingBox = platform.getComponent(BoxCollider2D).worldAABB;
            if (heroBoundingBox.intersects(platformBoundingBox)) {
                return platform;
            }
        }

        return null;
    }

    private getNextPlatform(currentPlatform) {
        // 获取英雄下一个平台的逻辑

        // 假设你的平台节点都有 "Platform" 标签
        const platforms = find("Canvas/Platforms").children;
        const currentIndex = platforms.indexOf(currentPlatform);

        if (currentIndex !== -1 && currentIndex < platforms.length - 1) {
            return platforms[currentIndex + 1];
        }

        return null;
    }


}