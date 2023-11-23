import { Vec2 } from "cc";
import { MonsterAttr } from "../../common/Constant";

export class MonsterModal {
  private id: number;
  private hp: number;
  private hpMax: number; // 最大血量
  private attackPower: number; // 攻击力
  private spellStrength: number; // 法强
  private physicalDefense: number; // 护甲
  private magicResistance: number; // 魔法抗性
  private moveSpeed: number; // 移动速度

  constructor(attr: MonsterAttr) {
    this.id = attr.id;
    this.hpMax = attr.hpMax;
    this.hp = attr.hpMax;
    this.attackPower = attr.attackPower;
    this.spellStrength = attr.spellStrength;
    this.physicalDefense = attr.physicalDefense;
    this.magicResistance = attr.magicResistance;
    this.moveSpeed = attr.moveSpeed;
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
