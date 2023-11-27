import { Node } from "cc";
import { Layer } from "../../common/Constant";
import ViewCtrl from "../../controller/ViewCtrl";
import { MonsterModal } from "../model/MonsterModal";
import { find } from "cc";

export default class MonsterView {

    private monsterNode: Node;
    private monsterData: MonsterModal;

    public init(data: MonsterModal) {
        this.monsterData = data;
        let roleLayer = ViewCtrl.getInstance().getLayer(Layer.ROLE)
        this.monsterNode = find("Canvas/Monster")
        this.monsterNode.parent = roleLayer;
    }

    public getMonsterNode() {
        return this.monsterNode
    }
}