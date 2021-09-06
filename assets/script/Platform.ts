// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import SimpleEnemy from "./SimpleEnemy";
import SimpleAlly from "./SimpleAlly";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'platform';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        

    }

    // update (dt) {}

    onBeginContact(contact, self, other) {
        // cc.log(other.node.uuid," begin contacting the platform")
        if (self != null && other != null && self.getComponent(Platform) != null && other.getComponent(SimpleEnemy) != null) {
            other.getComponent(cc.RigidBody).gravityScale = 0;
            other.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
        }
        if (self != null && other != null && self.getComponent(Platform) != null && other.getComponent(SimpleAlly) != null) {
            other.getComponent(cc.RigidBody).gravityScale = 0;
            other.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
        }
        
    }

    onEndContact(contact, self, other) {
        // cc.log(other.node.uuid," end contacting the platform")
        if (self != null && other != null && self.getComponent(Platform) != null && other.getComponent(SimpleEnemy) != null) {
            other.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
            other.getComponent(cc.RigidBody).gravityScale = 1;
        }
        if (self != null && other != null && self.getComponent(Platform) != null && other.getComponent(SimpleAlly) != null) {
            other.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
            other.getComponent(cc.RigidBody).gravityScale = 1;
        }
        
    }
}
