import { Node } from "cc";
import { Layer } from "../common/Constant";
import { find } from "cc";

export default class ViewCtrl {

    private static instance: ViewCtrl;

    private rootNode: Node = null;
    private layerMap: Map<number, Node> = new Map()

    public static getInstance(): ViewCtrl {
        if (!this.instance) {
            this.instance = new ViewCtrl()
        }
        return this.instance;
    }

    constructor() {
        this.rootNode = find("Canvas/Root");
        if (!this.rootNode) {
            console.log("init error")
            return
        }
        this.init()
    }

    private init() {
        console.log("init22222")
        for (let key in Layer) {
            // console.log("key=", key)
            if (typeof (Layer[key]) !== "number") {
                continue
            }
            let node = new Node();
            node.name = key
            this.rootNode.insertChild(node, Number(Layer[key]))
            this.layerMap.set(Number(Layer[key]), node)
        }
    }

    public getLayer(layer: number) {
        return this.layerMap.get(layer)
    }

}