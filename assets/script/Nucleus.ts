// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Nucleus extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'nucleus';


    @property
    _max_health: number = 500;

    @property
    health: number = 500;



    getDamaged(d: number) {
        this.health -= d;
        cc.log("nucleus ", this.uuid, " get hurt, rest ", this.health);
        if (this.health <= 0) {
            this.health = 0;
            this.getKilled();
        }
        
    }


    private getKilled() {
        // TODO: 细胞核炸裂游戏结束
        cc.log("game over");
        this.node.destroy();
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
