import { _decorator, Component, Label, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {

    @property({
        type: Node,
        displayName: "英雄节点"
    })
    heroNode: Node = null

    @property({
        type: Node,
        displayName: "怪物节点"
    })
    monsterNode: Node = null

    protected onLoad(): void {

    }

    protected start(): void {
        app.monsterCtrl.createMonster(1)
    }
}