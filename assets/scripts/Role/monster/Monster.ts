import { Vec2 } from "cc";

export class Monster {
  private id: number;
  private hp: number;
  private hpMax: number; // 最大血量
  private attackPower: number; // 攻击力
  private spellStrength: number; // 法强
  private physicalDefense: number; // 护甲
  private magicResistance: number; // 魔法抗性
  private moveSpeed: number; // 移动速度

  constructor(id: number, hpMax: number, attackPower: number, spellStrength: number,
    physicalDefense: number, magicResistance: number, moveSpeed: number) {
    this.id = id;
    this.hpMax = hpMax;
    this.hp = hpMax;
    this.attackPower = attackPower;
    this.spellStrength = spellStrength;
    this.physicalDefense = physicalDefense;
    this.magicResistance = magicResistance;
    this.moveSpeed = moveSpeed;
  }

  public get Id(): number {
    return this.id;
  }

  public get HP(): number {
    return this.hp;
  }

  public get HPMax(): number {
    return this.hpMax;
  }

  public get AttackPower(): number {
    return this.attackPower;
  }

  public get SpellStrength(): number {
    return this.spellStrength;
  }

  public get PhysicalDefense(): number {
    return this.physicalDefense;
  }

  public get MagicResistance(): number {
    return this.magicResistance;
  }

  public get MoveSpeed(): number {
    return this.moveSpeed;
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
