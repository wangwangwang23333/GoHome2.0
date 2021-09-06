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
        this.node.getComponent(cc.VideoPlayer).play();
        this.node.zIndex=999;

        this.node.parent.getChildByName('label').active=false;
        
        //预加载场景
        cc.director.preloadScene("level1", function () {
            cc.log("Next scene preloaded");
        });

        //视频播放完成事件
        this.node.on('completed', this.callback, this);

    }

    callback(){
        //切换场景
        cc.director.loadScene("level1");
    }

    gotoPlay(){
        cc.director.loadScene("level1");
        this.node.parent.getChildByName('button').getComponent(cc.Button).enabled=false;
        this.node.getComponent(cc.VideoPlayer).destroy();
        this.node.parent.getChildByName('label').active=true;
    }

    // update (dt) {}
}
