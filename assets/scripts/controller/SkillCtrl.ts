import SkillEffect from "../Role/skill/SkillEffect";

export default class SkillController {
    private skillData: SkillData;

    constructor(skillData: SkillData) {
        this.skillData = skillData;
    }

    public releaseSkill(target: any): void {
        if (this.canUseSkill()) {
            // 展示技能特效
            const skillEffect = new SkillEffect(this.getSkillEffectData());
            skillEffect.play();

            // 判断是否打击到敌人
            if (this.hitEnemy(target)) {
                // 计算伤害
                const damage = this.calculateDamage(target);

                // 展示伤害飘字
                this.showDamageNumber(target, damage);

                // 对敌人造成伤害
                target.receiveDamage(damage);
            }

            // 更新技能冷却等状态
            this.updateCooldown();
        }
    }

    private canUseSkill(): boolean {
        // 判断技能是否处于可释放状态（冷却等条件）
        return true;
    }

    private getSkillEffectData(): EffectData {
        // 从技能特效表中获取技能特效数据
        return { id: 1, name: "FireballEffect", duration: 2 };
    }

    private hitEnemy(target: any): boolean {
        // 判断技能是否击中敌人的逻辑
        return true;
    }

    private calculateDamage(target: any): number {
        // 计算伤害的逻辑，包括技能基础伤害、英雄属性、敌人抗性等
        const baseDamage = this.skillData.baseDamage
        // 具体计算逻辑根据实际需求和公式而定
        return baseDamage;
    }

    private showDamageNumber(target: any, damage: number): void {
        // 在屏幕上展示伤害飘字的逻辑
    }

    private updateCooldown(): void {
        // 更新技能冷却时间等状态的逻辑
    }
}
