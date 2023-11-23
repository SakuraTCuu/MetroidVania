import { Vec2 } from "cc";
import { MonsterModal } from "../model/MonsterModal";
import { MonsterAttr } from "../../common/Constant";

export class Monster {

    private modal: MonsterModal = null;

    constructor(data: MonsterAttr) {
        //解析生成数据
        this.modal = new MonsterModal(data);
    }

    public onTick(dt: number) {

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

    // 示例的扩展属性
    public get CriticalChance(): number {
        // 获取怪物的暴击几率
        return 5; // 假设暴击几率为5%
    }

    public get DodgeChance(): number {
        // 获取怪物的闪避几率
        return 10; // 假设闪避几率为10%
    }
}
