import { _decorator, CCInteger, Component, Node, EventMouse, KeyCode, Sprite, v2, v3, Vec2 } from 'cc';
import { FrameComponent } from '../../component/FrameComponent';
import { director, Director, find, BoxCollider2D } from 'cc';
import { KeyEvent } from '../../controller/InputCtrl';
import HeroModel from './HeroModel';
import { ConfigMgr } from '../../common/ConfigMgr';
import { UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HeroView')
export class HeroView extends Component {

    @property({
        type: CCInteger
    })
    MoveSpeed: number = 1;

    @property({
        type: Node
    })
    heroNode: Node = null;

    private frameComp: FrameComponent = null;
    private moveSpeed: number = 2;
    //移动方向
    private moveDirection: Vec2 = v2(0, 0)
    private clickFlag: boolean = true;

    //转身功能
    private flipBody: boolean = false;
    private preDirection: number = null;


    private model: HeroModel = null;

    private isShiftPressed: boolean = false;
    //蹲下状态
    private isCrouch: boolean = false;
    //跳
    private isJump: boolean = false;
    //翻滚
    private isRoll: boolean = false;

    onPressKeySpace: KeyEvent = {
        down: () => {
            this.clickFlag = true;
            // 跳
            this.playHeroAction("jump")
        },
        up: () => {
            this.clickFlag = false;
            this.moveDirection = v2(0, 0)
        }
    };
    onPressKeyW: KeyEvent = {
        down: () => {
            this.clickFlag = true;
            this.moveDirection = v2(0, 1)
            this.playHeroAction("run", false)
        },
        up: () => {
            this.clickFlag = false;
            this.moveDirection = v2(0, 0)
            this.playHeroAction("idle", false)
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
            this.playHeroAction("run", false)
        },
        up: () => {
            console.log("onPressKeyA up")
            this.clickFlag = false;
            this.moveDirection = v2(0, 0)
            this.playHeroAction("idle", false)
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
            this.playHeroAction("run", false)
        },
        up: () => {
            this.clickFlag = false;
            this.moveDirection = v2(0, 0)
            this.playHeroAction("idle", false)
        }
    };

    onMouseLeft: KeyEvent = {
        down: () => {
            let actName = "attack"
            //判断是否是蹲下状态
            if (this.isCrouch) {
                actName = "crouchAttack"
            }
            this.playHeroAction(actName)
        },
        up: () => {

        }
    }

    onMouseRight: KeyEvent = {
        down: () => {
            let actName = "attackCombo"
            //判断是否是蹲下状态
            if (this.isCrouch) {
                actName = "crouchAttack"
            }
            this.playHeroAction(actName)
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

    onPress_Shift_S: KeyEvent = {
        down: () => {
            console.log("onPress_Shift_S")
            this.clickFlag = true;
            this.isCrouch = true
            this.playHeroAction("crouch", false)
        },
        up: () => {
            this.clickFlag = false;
            this.isShiftPressed = false;
            this.isCrouch = false
            this.playHeroAction("idle", false)
        }
    }

    onPress_Shift_A: KeyEvent = {
        down: () => {
            this.clickFlag = true;
            this.isCrouch = true;
            this.moveDirection = v2(-1, 0)
            if (this.preDirection === KeyCode.KEY_D) {
                this.flipBody = true;
            }
            this.preDirection = KeyCode.KEY_A
            this.playHeroAction("crouchWalk", false)
        },
        up: () => {
            this.clickFlag = false;
            this.isCrouch = false;
            this.moveDirection = v2(0, 0)
            this.playHeroAction("idle", false)
        }
    }

    onPress_Shift_D: KeyEvent = {
        down: () => {
            this.clickFlag = true;
            this.isCrouch = true;
            this.moveDirection = v2(1, 0)
            if (this.preDirection === KeyCode.KEY_A) {
                this.flipBody = true;
            }
            this.preDirection = KeyCode.KEY_D
            this.playHeroAction("crouchWalk", false)
        },
        up: () => {
            this.clickFlag = false;
            this.isCrouch = false;
            this.moveDirection = v2(0, 0)
            this.playHeroAction("idle", false)
        }
    }

    start() {
        this.model = new HeroModel()
        app.inputCtrl
            .add("crouch", [KeyCode.SHIFT_LEFT, KeyCode.KEY_S], this.onPress_Shift_S)
            .add("crouch_left", [KeyCode.SHIFT_LEFT, KeyCode.KEY_A], this.onPress_Shift_A)
            .add("crouch_right", [KeyCode.SHIFT_LEFT, KeyCode.KEY_D], this.onPress_Shift_D)
            .add("down_platform", [KeyCode.SHIFT_LEFT, KeyCode.SPACE], this.onMouseDownPlatform)
            .addMouse("attack", EventMouse.BUTTON_LEFT, this.onMouseLeft)
            .addMouse("attack_heavy", EventMouse.BUTTON_RIGHT, this.onMouseRight)
            .add("right", [KeyCode.KEY_D], this.onPressKeyD)
            .add("left", [KeyCode.KEY_A], this.onPressKeyA)
            .add("jump", [KeyCode.SPACE], this.onPressKeySpace)

        this.frameComp = this.heroNode.addComponent(FrameComponent);
        this.frameComp.init()
    }

    update(dt: number) {
        if (!this.node) { return }
        if (this.clickFlag) {
            let vDist = this.moveDirection.clone().multiplyScalar(this.moveSpeed)
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

    public getHeroPos() {
        return this.node.getPosition()
    }

    /**
     * 播放动作
     * @param actName 动作名
     * @param once 是否只播放一次
     * @param pre 动作播放完成,是否恢复上一个动作
     */
    private playHeroAction(actName: string, once: boolean = true, pre: boolean = true) {
        this.frameComp.playOnceAction({
            actName,
            flag_onceAct: once,
            flag_preAct: pre
        })
    }
}