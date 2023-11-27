import { _decorator, CCInteger, Component, EventMouse, KeyCode, Sprite, v2, v3, Vec2 } from 'cc';
import { FrameComponent } from '../component/FrameComponent';
const { ccclass, property } = _decorator;

@ccclass('HeroComponent')
export class HeroComponent extends Component {

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
}