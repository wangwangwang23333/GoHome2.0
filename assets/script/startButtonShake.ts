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
    @property
    isRight:boolean=true;

    private count:number=0;
    private increase:boolean=true;

    //旋转
    circle(){
        if(this.isRight){
            if(this.increase){
                this.node.angle=this.node.angle+0.2;
            }
            else{
                this.node.angle=this.node.angle-0.2;
            }
        }
        else{
            if(!this.increase){
                this.node.angle=this.node.angle+0.2;
            }
            else{
                this.node.angle=this.node.angle-0.2;
            }
        }
        ++this.count;
        if(this.count>=20){
            this.increase=!this.increase;
            this.count=0;
        }
    }

    start () {

    }

    update (dt) {
        this.circle();
    }
}
