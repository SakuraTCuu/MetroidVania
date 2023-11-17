import { Scheduler } from "cc";
import { director } from "cc";

export default class TimeCtrl {

    public static _instance: TimeCtrl = null
    private _scheduler: Scheduler = null

    public static get instance() {
        if (!this._instance) {
            this._instance = new TimeCtrl()
            this._instance.init()
        }
        return this._instance
    }

    private init() {
        this._scheduler = director.getScheduler()
    }

    public add(cb: Function, target: any, interval: number, times: number) {
        this._scheduler.schedule(cb as any, target, interval, times)
    }

    public addOnce(cb: Function, target: any, interval: number) {
        this._scheduler.schedule(cb as any, target, interval, 1)
    }

    public delete(cb: Function, target: any) {
        this._scheduler.unschedule(cb, target)
    }
}