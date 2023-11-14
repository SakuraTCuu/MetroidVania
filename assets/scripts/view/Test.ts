import { _decorator, Component, Label, Node, UITransform } from 'cc';
import { ConfigMgr, FrameInfo } from '../common/ConfigMgr';
import { FrameComponent } from '../component/FrameComponent';
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

    start() {
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


