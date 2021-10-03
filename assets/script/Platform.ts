// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html



import JumpEvent from "./jumpEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    @property
    text: string = 'platform';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        

    }

    // update (dt) {}

    onBeginContact(contact, self, other) {
        // cc.log(other.node.uuid," begin contacting the platform", other.node.name)
        
        if (self != null && other != null && self.getComponent(Platform) != null && other.node.name == "lysosome") {
            console.log("主角接触到地面了")
            this.node.parent.parent.getComponent(JumpEvent).clearJumpCount()
            //other.getComponent(cc.RigidBody).gravityScale = 0;
            //other.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
        }
        // if (self != null && other != null && self.getComponent(Platform) != null && other.getComponent(SimpleAlly) != null) {
        //     other.getComponent(cc.RigidBody).gravityScale = 0;
        //     other.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
        // }
        
    }

    onEndContact(contact, self, other) {
        // cc.log(other.node.uuid," end contacting the platform")

        // if (self != null && other != null && self.getComponent(Platform) != null && other.getComponent(SimpleAlly) != null) {
        //     other.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0);
        //     other.getComponent(cc.RigidBody).gravityScale = 1;
        // }
        
    }
}
