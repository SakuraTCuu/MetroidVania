import { Vec3, v3 } from "cc";
import HeroCtrl from "../Role/hero/HeroCtrl";
import { Node } from "cc";
import { Monster } from "../Role/monster/Monster";

export enum MonsterState {
  Patrol,
  Chase,
  Dead,
}

export default class MonsterBehaviorTree {
  private state: MonsterState = MonsterState.Patrol;
  private patrolTimer: number = 0;
  private chaseTimer: number = 0;
  private deadTimer: number = 0;

  // 状态切换的参数，你可能需要根据具体情况调整
  private readonly MAX_CHASE_TIME: number = 5; // 最大追击时间
  private readonly RESPAWN_TIME: number = 10; // 复活时间
  private readonly PATROL_RADIUS: number = 300; // 巡逻领地半径
  private readonly CHASE_RADIUS: number = 200; // 追击领地半径

  private monsterNode: Node;
  private monster: Monster;

  public init(node: Node, monster: Monster) {
    this.monsterNode = node;
    this.monster = monster;
  }

  public update(dt: number): void {
    switch (this.state) {
      case MonsterState.Patrol:
        this.updatePatrol(dt);
        break;
      case MonsterState.Chase:
        this.updateChase(dt);
        break;
      case MonsterState.Dead:
        this.updateDead(dt);
        break;
    }
  }

  private updatePatrol(dt: number): void {
    // console.log("巡逻")
    // 实现巡逻逻辑
    this.patrolTimer += dt;

    // 如果检测到玩家进入领地，切换到追击状态
    if (this.distanceToPlayer() < this.CHASE_RADIUS) {
      this.state = MonsterState.Chase;
      this.chaseTimer = 0;
      // 进入追击状态时的其他逻辑，比如播放追击动画
    }
  }

  private updateChase(dt: number): void {
    // console.log("追击")
    // 实现追击逻辑
    this.chaseTimer += dt;

    // 如果玩家逃离领地范围或者怪物无法追击，切换回巡逻状态
    if (this.distanceToPlayer() > this.CHASE_RADIUS || this.chaseTimer > this.MAX_CHASE_TIME) {
      this.state = MonsterState.Patrol;
      this.patrolTimer = 0;
      // 切换回巡逻状态时的其他逻辑，比如播放巡逻动画
    }
  }

  private updateDead(dt: number): void {
    console.log("死亡")
    // 实现死亡逻辑
    this.deadTimer += dt;

    // 如果死亡时间超过一定阈值，复活并切换到巡逻状态
    if (this.deadTimer > this.RESPAWN_TIME) {
      this.state = MonsterState.Patrol;
      this.patrolTimer = 0;
      this.deadTimer = 0;
      // 复活时的其他逻辑
    }
  }

  private distanceToPlayer(): number {
    let heroPos = HeroCtrl.getInstance().getHeroPos()
    if (!heroPos) { return Number.MAX_VALUE }
    // 计算怪物到玩家的距离
    return heroPos.subtract(this.monsterPosition).length();
  }

  private get monsterPosition(): Vec3 {
    // 获取怪物当前位置的逻辑，比如根据怪物的节点获取位置
    return this.monsterNode.getPosition()
  }
}

