// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SceneManager from "./sceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.Node)
    level: cc.Node = null;

    start () {
        cc.log("level是",this.level)
    }

    onBeginContact(contact, self, other) {
        cc.log(other.node.uuid," 接触到了", other.node.name)
        
        if (self != null && other != null && self.getComponent(Hero) != null && other.node.name == "enemy") {
            cc.log("游戏结束！")
            this.level.getComponent(SceneManager).gameFail()
        }

        if (self != null && other != null && self.getComponent(Hero) != null && other.node.name == "xianliti") {
            cc.log("吃到道具了！")
            //藏起来
            cc.log(other.node.y)
            other.node.active = false
            //other.node.y = 2000
            this.level.getComponent(SceneManager).getProp()
        }

        
    }

    onEndContact(contact, self, other) {
        // cc.log(other.node.uuid," end contacting the platform")

        // if (self != null && other != null && self.getComponent(Platform) != null && other.getComponent(SimpleAlly) != null) {
        //     other.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
        //     other.getComponent(cc.RigidBody).gravityScale = 1;
        // }
        
    }

    // update (dt) {}
}
