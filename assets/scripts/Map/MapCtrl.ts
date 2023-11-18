import { Enum } from "cc"
import { TileMap } from "./TileMap";
import { Tile, TileType } from "./TileModule";

export default class MapCtrl {
  //地图控制

  private myTileMap: TileMap = null;
  /**
   * 地图分块, 
   * 动态生成地图
   */
  constructor() {
    this.myTileMap = new TileMap();
  }

  public initData(data) {
    const myTile: Tile = {
      id: 1,
      x: 0,
      y: 0,
      width: 32,
      height: 32,
      res: 'path/to/your/resource.png',
      type: TileType.Block,
    };

    this.myTileMap.addTile(myTile);
  }

  /**
   * 传入数据, 创建一个地图
   */
  public createMapByData() {

  }

  /**
   * 绘制下一屏的场景
   */
  public createNextScreen() {

  }

  /**
   *
   */
  public creatScreenById() {

  }

}