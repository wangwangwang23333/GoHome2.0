// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {




    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
        //let that=this;
        let act=cc.sequence(cc.moveBy(0.7+0.5*Math.random(),new cc.Vec2(-200,560)),
        cc.callFunc(()=>{
            cc.log("获得ATP");
            
            this.node.parent.getComponent('level').gainATP();
            this.node.destroy();
        }))
        this.node.runAction(act);
        
    }

    // update (dt) {}
}
