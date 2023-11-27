import { director } from "cc";
import HeroCtrl from "./controller/HeroCtrl";
import InputCtrl from "./controller/InputCtrl";
import MonsterCtrl from "./controller/MonsterCtrl";
import SkillCtrl from "./controller/SkillCtrl";
import ViewCtrl from "./controller/ViewCtrl";
import { sys, game, Game, Director } from "cc";
import { Scene } from "../@types/packages/engine-extends/@types/glTF";

class App {
    public inputCtrl: InputCtrl;
    public heroCtrl: HeroCtrl;
    public monsterCtrl: MonsterCtrl;
    public skillCtrl: SkillCtrl;
    public viewCtrl: ViewCtrl;

    public init() {
        this.inputCtrl = new InputCtrl;
        this.heroCtrl = HeroCtrl.getInstance();
        this.monsterCtrl = MonsterCtrl.getInstance();
        this.skillCtrl = SkillCtrl.getInstance();
    }

    public layzInit() {
        this.viewCtrl = ViewCtrl.getInstance();
    }
}

declare global {
    const app: App;
}

if (typeof app == typeof undefined) {
    const app = new App();
    (window as any).app = app;
    if (sys.platform !== sys.Platform.EDITOR_PAGE) {
        // App初始化
        game.once(Game.EVENT_ENGINE_INITED, () => app.init());

        // 场景初次启动
        director.once(Director.EVENT_AFTER_SCENE_LAUNCH, (scene: Scene) => {
            app.layzInit()
        });
    }
}
