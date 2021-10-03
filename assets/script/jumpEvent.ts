// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SceneManager from "./sceneManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JumpEvent extends cc.Component {

    // LIFE-CYCLE CALLBACKS:


    //获取主角
    @property(cc.Node)
    hero: cc.Node = null

    @property(cc.Node)
    gameControl: cc.Node = null;

    //记录跳跃的次数
    jumpCount: number = 0

    //最大跳跃次数
    maxJumpAmount: number = 2



    onLoad() {
        this.hero = this.node.getChildByName("lysosome")

        console.log(this.hero)
        //点击鼠标事件
        this.node.on(cc.Node.EventType.TOUCH_START, (event)=>{
            console.log("鼠标被按下")

            if(this.gameControl.getComponent(SceneManager).gamePaused){
                return;
            }

            if (this.jumpCount < this.maxJumpAmount){
                this.hero.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,1000);
                this.jumpCount += 1
            }
        }, this);
    }

    start () {
        
    }

    //跳跃次数清零
    clearJumpCount() {
        this.jumpCount = 0
    }

    // update (dt) {}
}
