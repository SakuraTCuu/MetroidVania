import { Vec2 } from "cc";
import { MonsterModal } from "../model/MonsterModal";
import { MonsterAttr } from "../../common/Constant";
import Utils from "../../common/Utils";
import MonsterBehaviorTree from "../../common/MonsterBehaviorTree";
import MonsterView from "./MonsterView";

export class Monster {

    //数据
    private modal: MonsterModal = null;
    private uid: string = "";
    //行为树
    private monsterBehaviorTree: MonsterBehaviorTree;
    //view
    private monsterView: MonsterView;

    constructor(data: MonsterAttr) {
        //解析生成数据
        this.modal = new MonsterModal(data);
        this.uid = Utils.uuid()
        this.monsterBehaviorTree = new MonsterBehaviorTree();
        this.monsterView = new MonsterView()

        this.monsterView.init(this.modal)
        
        this.monsterBehaviorTree.init(this.monsterView.getMonsterNode(), this)
    }

    public getModal(): MonsterModal {
        return this.modal;
    }

    public getUid() {
        return this.uid;
    }

    public onTick(dt: number) {
        // 在每一帧更新怪物行为树，传入玩家位置信息
        this.monsterBehaviorTree.update(dt);
    }

    // 其他方法，比如攻击、行走、技能等操作
    public attack(target: Monster): void {
        // 实现攻击逻辑
    }

    public move(destination: Vec2): void {
        // 实现行走逻辑
    }

    public useSkill(skillId: number): void {
        // 实现使用技能逻辑
    }

    /**
     * 销毁
     */
    public destroy() {

    }
}
