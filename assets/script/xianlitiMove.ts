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
    private count:number=0;
    private increase:boolean=true;

    start () {
        
    }

    update (dt) {
        if(this.increase){
            this.node.angle=this.node.angle+1;
        }
        else{
            this.node.angle=this.node.angle-1;
        }
        ++this.count;
        if(this.count>=50){
            this.increase=!this.increase;
            this.count=0;
        }
        
    }
}
