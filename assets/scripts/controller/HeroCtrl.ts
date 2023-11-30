import { Node, _decorator, CCInteger, Component, EventMouse, KeyCode, Sprite, v2, v3, Vec2 } from 'cc';
import { find } from 'cc';
import { BoxCollider2D } from 'cc';
import BaseCtrl from '../base/BaseCtrl';

export default class HeroCtrl extends BaseCtrl {

    private static instance: HeroCtrl;

    public static getInstance(): HeroCtrl {
        if (!this.instance) {
            this.instance = new HeroCtrl()
        }
        return this.instance;
    }

    private heroNode: Node;

    constructor() {
        super()
    }

    private heroDropLogic() {
        // 获取英雄当前所在平台的信息，可以通过碰撞检测等方式实现
        // 如果英雄在一个平台上，执行掉落逻辑，否则忽略
        const currentPlatform = this.getCurrentPlatform();

        if (currentPlatform) {
            // 执行掉落逻辑，比如修改英雄的位置到下一个平台
            const nextPlatform = this.getNextPlatform(currentPlatform);
            if (nextPlatform) {
                // this.node.position = nextPlatform.position.add(v2(0, currentPlatform.height + 10));
            }
        }
    }

    private getCurrentPlatform() {
        // 获取英雄当前所在平台的逻辑

        // 假设你的平台节点都有 "Platform" 标签
        const platforms = find("Canvas/Platforms").children;

        // let pfmBox = new geometry.AABB
        const heroBoundingBox = this.heroNode.getComponent(BoxCollider2D).worldAABB;

        for (const platform of platforms) {
            const platformBoundingBox = platform.getComponent(BoxCollider2D).worldAABB;
            if (heroBoundingBox.intersects(platformBoundingBox)) {
                return platform;
            }
        }

        return null;
    }

    private getNextPlatform(currentPlatform) {
        // 获取英雄下一个平台的逻辑

        // 假设你的平台节点都有 "Platform" 标签
        const platforms = find("Canvas/Platforms").children;
        const currentIndex = platforms.indexOf(currentPlatform);

        if (currentIndex !== -1 && currentIndex < platforms.length - 1) {
            return platforms[currentIndex + 1];
        }

        return null;
    }

    public getHeroPos() {
        if (!this.heroNode) { return v3() }
        return this.heroNode.getPosition()
    }

}
