import { _decorator, Component, Label, Node, UITransform } from 'cc';
import { ConfigMgr, FrameInfo } from '../common/ConfigMgr';
import { FrameComponent } from '../component/FrameComponent';
import InputCtrl, { KeyEvent } from '../controller/InputCtrl';
import { KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {

    @property({
        type: FrameComponent
    })
    frameCtl: FrameComponent = null;

    @property({
        type: Node
    })
    contentView: Node = null;

    private data: Record<string, FrameInfo> = null;

    private inputCtrl: InputCtrl = new InputCtrl;

    onPressKeyW: KeyEvent = {
        down: () => {
            console.log("keyw_down")
        }
    };

    onPressKeyCX: KeyEvent = {
        down: () => {
            console.log("onPressKeyCX")
        }
    };

    start() {
        this.inputCtrl
            .add("forward", [KeyCode.KEY_W], this.onPressKeyW)
            .add("basketball", [KeyCode.KEY_C, KeyCode.KEY_X], this.onPressKeyCX)

        this.data = ConfigMgr.heroAction
        for (const actionName in this.data) {
            let item = new Node()
            item.parent = this.contentView;
            let uiTrans = item.addComponent(UITransform)
            uiTrans.setContentSize(240, 120)
            let label = item.addComponent(Label)
            label.string = actionName
            item.on(Node.EventType.TOUCH_END, () => {
                this.frameCtl.playOnceAction(this.data[actionName])
            }, this)
        }
    }

    update(deltaTime: number) {

    }
}


