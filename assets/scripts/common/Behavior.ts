/**
 * 行为树相关
 */
//判断那些行为可以触发, 哪些行为不能触发
export class Behavior {
    //所有动作列表
    private action: Array<string> = []
    //约束列表
    //某些动作不能直接转换的动作列表,比如 死亡状态不能直接转换为射击动作,
    private constraint: Record<string, Array<string>> = {}

    //当前执行的动作
    private curActionName: string = ""

    //执行动作时的回调
    private callback: Function = null;

    /**
     * 
     * @param action 
     * @param constraint 
     */
    public init(action, constraint) {
        this.action = action;
        this.constraint = constraint;
    }

    public addCallbackListener(callback: Function) {
        this.callback = callback;
    }

    /**
     * 
     * @param actionName 
     * @returns 
     */
    public canPlayAction(actionName) {
        if (this.action.indexOf(actionName) == -1) {
            return false
        }
        if (this.constraint[this.curActionName] &&
            this.constraint[this.curActionName].indexOf(actionName) != -1) {
            //存在约束,不能执行
            return false
        }
        return true;
    }

    public playAction(actionName) {
        if (!this.canPlayAction(actionName)) {
            console.log(`当前动作${this.curActionName}不能切换为${actionName}`)
            return
        }
        this.curActionName = actionName;
        // 发送事件, 执行切换
        this.fire();
    }

    //默认动作Idle

    /**
     * 重置行为树状态
     */
    public reset() {
        this.curActionName = "";
    }

    /**
     * 发送事件
     */
    private fire() {
        //当前切换成功的 action
        this.callback && this.callback(this.curActionName)
    }
}