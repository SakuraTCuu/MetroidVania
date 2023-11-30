import { EventMouse } from "cc";
import { input, KeyCode, EventKeyboard, Input, sys } from "cc";

export type KeyCombo = KeyCode[];
export type KeyEvent = {
    state?: boolean  //状态
    down?: Function
    press?: Function
    up?: Function
    move?: Function
}

export type KeyBinding = {
    combo: KeyCombo,
    event: KeyEvent,
}

export type KeyMouseBinding = {
    combo: number,
    event: KeyEvent,
}

/**
 * 输入控制器
 */
export default class InputCtrl {

    private timer = null;
    public h = 0
    public v = 0
    public mag = 1;
    private keyState = new Map<KeyCode, boolean>;
    private keyMouseState = new Map<number, boolean>;
    private keyEventMap = new Map<KeyCombo, KeyEvent>;
    private keyBindingMap = new Map<string, KeyBinding>;

    private keyMouseEventMap = new Map<number, KeyEvent>;
    private keyMouseBindingMap = new Map<string, KeyMouseBinding>;

    constructor() {
        if (!sys.isMobile) {
            input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
            input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
            input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
            input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
            let self = this;
            document.addEventListener('visibilitychange', function () {
                let isHidden = document.hidden;
                if (isHidden) {
                    if (self.timer) {
                        clearTimeout(self.timer);
                    }
                    self.h = self.v = 0;
                    self.mag = 1;
                }
            });
        }
    }

    private onMouseDown(event: EventMouse) {
        const clickBtn = event.getButton();
        this.keyMouseState.set(clickBtn, true);
        for (let key of this.keyMouseEventMap.keys()) {
            let keystate = this.keyMouseState.get(key);
            if (keystate) {
                this.keyMouseState.set(clickBtn, false);
                const cb = this.keyMouseEventMap.get(key);
                if (cb.down) cb.down(event);
                break;
            }
        }
    }

    private onMouseUp(event: EventMouse) {
        const clickBtn = event.getButton();
        this.keyMouseState.set(clickBtn, true);
        for (let key of this.keyMouseEventMap.keys()) {
            let keystate = this.keyMouseState.get(key);
            if (keystate) {
                this.keyMouseState.set(clickBtn, false);
                const cb = this.keyMouseEventMap.get(key);
                if (cb.up) cb.up(event);
                break;
            }
        }
    }

    private onMouseMove(event: EventMouse) {
        const clickBtn = event.getButton();
        this.keyMouseState.set(clickBtn, true);
        for (let key of this.keyMouseEventMap.keys()) {
            let keystate = this.keyMouseState.get(key);
            if (keystate) {
                this.keyMouseState.set(clickBtn, false);
                const cb = this.keyMouseEventMap.get(key);
                if (cb.move) cb.move(event);
                break;
            }
        }
    }

    // private onKeyUp(event: EventKeyboard) {
    //     const keyCode = event.keyCode;
    //     this.keyState.set(keyCode, false);
    //     for (let keys of this.keyEventMap.keys()) {

    //         if (keys.indexOf(keyCode) == -1) {
    //             continue;
    //         }

    //         let keystate = false
    //         let length = keys.length;
    //         for (var i = 0; i < length; i++) {
    //             const key = keys[i];
    //             keystate = this.keyState.get(key);
    //             if (!keystate) {
    //                 break;
    //             }
    //         }
    //         if (keystate) {
    //             const cb = this.keyEventMap.get(keys);
    //             if (cb.up) cb.up(event);
    //             break;
    //         }
    //     }
    //     this.keyState.set(keyCode, false);
    // }

    private onKeyUp(event: EventKeyboard) {
        const keyCode = event.keyCode;
        this.keyState.set(keyCode, false);
        for (let keys of this.keyEventMap.keys()) {

            if (keys.indexOf(keyCode) == -1) {
                continue;
            }

            const cb = this.keyEventMap.get(keys);
            if (cb.state && cb.up) { //触发过down, 则触发up
                cb.state = false
                cb.up(event);
            }
        }
    }

    private onKeyDown(event: EventKeyboard) {
        const keyCode = event.keyCode;

        this.keyState.set(keyCode, true);
        for (let keys of this.keyEventMap.keys()) {
            let keystate = false;
            let length = keys.length;
            for (let i = 0; i < length; i++) {
                const key = keys[i]
                keystate = this.keyState.get(key);
                if (!keystate) {
                    break;
                }
            }

            if (keystate) {
                const cb = this.keyEventMap.get(keys);
                cb.state = true;
                if (cb.down) cb.down(event);
                break;
            }
        }
    }

    addMouse(eventName: string, combo: number, keyEvent: KeyEvent) { //注册鼠标事件
        const config = this.keyMouseBindingMap.get(eventName);
        if (config) {
            this.removeMouseKey(config.combo);
        }
        const keyConfig: KeyMouseBinding = { combo: combo, event: keyEvent };
        this.keyMouseBindingMap.set(eventName, keyConfig);
        this.addMouseKey(combo, keyEvent);

        this.keyMouseEventMap.set(combo, keyEvent)
        return this;
    }

    /**
     * @Description: add new combo with event
     * @param {KeyCode} keys use array for combination keys use single Keycode for single Key
     * @param {KeyEvents} event
     * @return {*}
     */
    private addMouseKey(combo: number, event: KeyEvent) {
        this.keyMouseEventMap.set(combo, event);
        return this;
    }

    /**
     * @en : remove combo
     * @cn : 删除按键组合
     * @param {number} combo
     */
    private removeMouseKey(combo: number) {
        this.keyMouseEventMap.delete(combo);
        return this;
    }

    removeMouse(combo: number) {
        this.keyMouseEventMap.delete(combo);
    }

    /**
    * @en : add new key binding 
    * @cn : 添加新的按键注册
    * @param {string} eventName  event Name
    * @param {KeyCombo} combo  keys, could be combos
    * @param {KeyEvents} keyEvent key events
    * @param {Label} label label
    */
    add(eventName: string, combo: KeyCombo, keyEvent: KeyEvent) {
        const config = this.keyBindingMap.get(eventName);
        if (config) {
            this.removeKey(config.combo);
        }
        const keyConfig: KeyBinding = { combo: combo, event: keyEvent };
        this.keyBindingMap.set(eventName, keyConfig);
        this.addKey(combo, keyEvent);
        return this;
    }

    /**
     * @en : clear a binding event
     * @cn : 清除绑定的事件
     * @param {string} eventName
     */
    clear(eventName: string) {
        const config = this.keyBindingMap.get(eventName);
        if (config) {
            config.combo.length = 0;
        }
        return this;
    }

    /**
    * @en : remove key binding
    * @cn : 移除按键注册
    * @param {string} eventName
    */
    remove(eventName: string) {
        const config = this.keyBindingMap.get(eventName);
        if (config) {
            this.removeKey(config.combo);
            this.keyBindingMap.delete(eventName);
        }
        return this;
    }

    /**
     * @en : get config map
     * @cn : 获取按键事件
     * @param {string} eventName
     */
    get(eventName: string) {
        return this.keyBindingMap.get(eventName) || null;
    }

    /**
     * @Description: add new combo with event
     * @param {KeyCode} keys use array for combination keys use single Keycode for single Key
     * @param {KeyEvents} event
     * @return {*}
     */
    private addKey(combo: KeyCombo, event: KeyEvent) {
        combo.sort();
        this.keyEventMap.set(combo, event);
        return this;
    }

    /**
     * @en : remove combo
     * @cn : 删除按键组合
     * @param {KeyCombo} combo
     */
    private removeKey(combo: KeyCombo) {
        this.keyEventMap.delete(combo);
        return this;
    }

    /**
    * @en : get all binding keys in array
    * @cn : 获取所有的绑定键数组
    */
    getKeys() {
        let actions = []
        for (let key of this.keyBindingMap.keys()) {
            actions.push(key);
        }
        return actions;
    }
}