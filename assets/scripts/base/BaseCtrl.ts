import { director, Director } from "cc";

export default class BaseCtrl {

    constructor() {
        director.on(Director.EVENT_BEFORE_UPDATE, (dt) => {
            this.onTick(dt)
        });
    }

    onTick(dt?: number) {

    }

}