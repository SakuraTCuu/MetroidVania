import { BoxCollider } from 'cc';
import { Tile } from './TileModule';
import { Vec2, Vec3, UITransform, director, Node, Sprite } from 'cc';

export class TileMap {
    private tiles: Tile[] = [];
    private loadedTiles: Array<Tile> = []; // 保存当前已加载的Tile
    private loadDistance = 500; // 你可以根据实际情况调整加载距离

    constructor() {
        // 初始化TileMap
    }

    public addTile(tile: Tile): void {
        // 添加Tile到TileMap
        this.tiles.push(tile);
    }

    public loadInitialTiles(playerX: number): void {
        // 根据玩家初始位置加载初始的Tile
        this.loadTilesInRange(playerX);
    }

    public update(playerX: number): void {
        // 在玩家移动时进行更新
        this.loadTilesInRange(playerX);
        this.unloadTilesOutOfRange(playerX);
    }

    private loadTilesInRange(playerX: number): void {
        // 加载玩家附近的Tile
        for (const tile of this.tiles) {
            if (!this.loadedTiles.includes(tile) && this.isTileInRange(tile, playerX)) {
                this.loadedTiles.push(tile);
                this.generateTile(tile);
            }
        }
    }

    private unloadTilesOutOfRange(playerX: number): void {
        // 卸载玩家远离的Tile
        for (let i = this.loadedTiles.length - 1; i >= 0; i--) {
            const tile = this.loadedTiles[i];
            if (!this.isTileInRange(tile, playerX)) {
                this.unloadTile(tile);
                this.loadedTiles.splice(i, 1);
            }
        }
    }

    private isTileInRange(tile: Tile, playerX: number): boolean {
        // 检查Tile是否在玩家附近的范围内
        return Math.abs(tile.x - playerX) < this.loadDistance;
    }

    private generateTile(tile: Tile): void {
        // 生成Tile对应的场景元素
        // 在这里使用Cocos Creator的API创建Sprite节点等
        const tileNode = new Node();
        const sprite = tileNode.addComponent(Sprite);
        // sprite.spriteFrame = // Load sprite frame from tile.res
        const uiTrans = tileNode.addComponent(UITransform)
        tileNode.position = new Vec3(tile.x, tile.y, 0);
        uiTrans.width = tile.width;
        uiTrans.height = tile.height;

        // 添加 BoxCollider
        const boxCollider = tileNode.addComponent(BoxCollider);
        // boxCollider.offset = new Vec2(tile.width / 2, tile.height / 2); // 设置偏移量
        boxCollider.size = new Vec3(tile.width, tile.height); // 设置碰撞框大小
        // boxCollider.shape
        // director.getScene().addChild(tileNode);
    }

    private unloadTile(tile: Tile): void {
        // 卸载Tile对应的场景元素
        // 在这里销毁Cocos Creator的Sprite节点等
        // 注意：这里的实现方式可能需要根据你的具体场景管理方式来调整
        // 例如，你可能需要从场景中移除并销毁相应节点
    }

    public generateScene(): void {
        // 根据Tile信息生成场景
        // 遍历this.tiles，根据每个Tile的信息，在场景中动态生成对应的元素
        for (const tile of this.tiles) {
            const spriteNode = new Node();
            const sprite = spriteNode.addComponent(Sprite);
            const uiTrans = spriteNode.addComponent(UITransform)
            // 设置Sprite节点的位置、大小和贴图
            spriteNode.position = new Vec3(tile.x, tile.y, 0);
            uiTrans.width = tile.width;
            uiTrans.height = tile.height;
            // sprite.spriteFrame = // Load sprite frame from tile.res

            // 将Sprite节点添加到场景中
            // 你可能需要将生成的节点添加到Canvas节点下或其他合适的节点下
            director.getScene().addChild(spriteNode);
        }
    }

}