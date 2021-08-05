// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

const AllyKinds = {
    "lysosome": 1,
    "p450": 2,
    "crisp": 3
}

@ccclass
export default class NewClass extends cc.Component {

    @property({
        displayName:"己方单位",
        type:[cc.Prefab],
        tooltip:"己方单位种类"
    })
    allies: cc.Prefab[] = [];

    @property({
        displayName: "敌人顺序",
        tooltip: "敌人顺序",
        type: [cc.Integer]
    })
    enemySequence: number[] = [];

    @property({
        displayName: "敌方单位",
        tooltip: "敌方单位种类",
        type: [cc.Prefab]
    })
    enemies: cc.Prefab[] = [];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = 1;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        // let clickEventHandler = new cc.Component.EventHandler();
        // clickEventHandler.target = this.node
        // clickEventHandler.component = "Game"
        // clickEventHandler.handler = "createAlly(" + AllyKinds.lysosome + ")"

        // let buttons = this.getComponents(cc.Button)
        // console.log(buttons)
        // var createLysosomeBtn = null;
        // for (let i = 0; i < buttons.length; i++) {
        //     const b = buttons[i];
        //     console.log(b)
        //     if (b.name == "createLysosomeBtn") createLysosomeBtn = b;
        // }
        // createLysosomeBtn.clickEvents.push(clickEventHandler)
    }

    createAlly(e, i) {
        console.log("add ally number ", i);

        let prefab = this.allies[i - 1];

        // TODO: 检查剩余多少钱，够不够买
        let ally = cc.instantiate(prefab);
        ally.setParent(this.node);
        ally.position = cc.v3(-112, -203);

    }

    createEnemy(i) {
        console.log("add enemy number ", i);
        let prefab = this.enemies[i-1]

        let enemy = cc.instantiate(prefab)
        enemy.setParent(this.node)
        enemy.position = cc.v3(720, -184);
    }

    start () {

    }

    // update (dt) {}
}
