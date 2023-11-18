
export enum TileType {
    Block = "block",              // 砖块
    TreasureChest = "treasure",   // 宝箱
    HighWall = "highWall",        // 高墙
    DiggableTreasure = "diggableTreasure", // 可挖掘宝藏
    MonsterSpawnPoint = "monsterSpawnPoint", // 怪物出生点
    TeleportationPortal = "teleportationPortal", // 传送阵
    HiddenArea = "hiddenArea",    // 隐藏区域
    DestructibleObstacle = "destructibleObstacle", // 可破坏障碍
    // 添加更多类型...
}

export interface Tile {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    res: string; //资源路径
    type: TileType; //类型
}

export const generateMapTiles = (): Tile[] => {
    const mapWidth = 3680;
    const mapHeight = 1440;
    const tileWidth = 40;
    const tileHeight = 40;

    const tiles: Tile[] = [];

    // 生成 Block 平台
    for (let x = 0; x < mapWidth; x += tileWidth) {
        for (let y = 0; y < mapHeight; y += tileHeight) {
            const tile: Tile = {
                id: tiles.length + 1,
                x: x,
                y: y,
                width: tileWidth,
                height: tileHeight,
                res: 'path/to/block.png',
                type: TileType.Block,
            };
            tiles.push(tile);
        }
    }

    // 生成其他 Tile，比如短挡板、高平台等

    // 生成短挡板
    const shortBarrierWidth = tileWidth * 3;
    const shortBarrierHeight = tileHeight;
    const shortBarrier: Tile = {
        id: tiles.length + 1,
        x: mapWidth / 2 - shortBarrierWidth / 2,
        y: mapHeight / 2 - shortBarrierHeight / 2,
        width: shortBarrierWidth,
        height: shortBarrierHeight,
        res: 'path/to/short_barrier.png', // 你的挡板资源路径
        type: TileType.Block, // 这里使用Block类型，你可以根据需要修改
    };
    tiles.push(shortBarrier);

    // 生成高平台
    const highPlatformWidth = tileWidth * 5;
    const highPlatformHeight = tileHeight * 3;
    const highPlatform: Tile = {
        id: tiles.length + 1,
        x: mapWidth / 2 - highPlatformWidth / 2,
        y: mapHeight / 2 + tileHeight * 2,
        width: highPlatformWidth,
        height: highPlatformHeight,
        res: 'path/to/high_platform.png', // 你的高平台资源路径
        type: TileType.Block, // 这里使用Block类型，你可以根据需要修改
    };
    tiles.push(highPlatform);

    return tiles;
};