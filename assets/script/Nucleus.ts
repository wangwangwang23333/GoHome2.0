// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SceneManager from "./sceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Nucleus extends cc.Component {

    @property(cc.Node)
    gameControl: cc.Node = null;

    start () {

    }

    onLoad() {
        this.gameControl = this.node.parent;
    }

    update (dt) {
        if (this.gameControl.getComponent(SceneManager).gamePaused){
            return;
        }
        this.node.angle=this.node.angle+1;
    }
}
