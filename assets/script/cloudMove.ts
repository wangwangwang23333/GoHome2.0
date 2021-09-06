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

    private upMoving:boolean=false;
    private moveCount:number=0;
    private count:number=0;
    private increase:boolean=true;
    private mapSize:cc.Size=null;
    
    @property
    moveSpeed:number=1;

    start () {
        this.mapSize=cc.view.getVisibleSize();
    }

    upMove(){
        if(this.upMoving){
            this.node.y=this.node.y+0.5;
        }
        else{
            this.node.y=this.node.y-0.5;
        }
        ++this.moveCount;
        if(this.moveCount>=40){
            this.upMoving=!this.upMoving;
            this.moveCount=0;
        }
    }

    leftMove(){
        this.node.x=this.node.x-this.moveSpeed;
        if(this.node.x<=-this.mapSize.width/2-50){
            this.node.x=this.mapSize.width/2+70;
        }
    }

    //旋转
    circle(){
        if(this.increase){
            this.node.angle=this.node.angle+0.2;
        }
        else{
            this.node.angle=this.node.angle-0.2;
        }
        ++this.count;
        if(this.count>=50){
            this.increase=!this.increase;
            this.count=0;
        }
    }

    update (dt) {
        this.upMove();
        this.leftMove();
        this.circle();
    }
}
