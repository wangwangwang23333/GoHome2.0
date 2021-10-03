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
    @property(cc.AudioClip)
    pauseSE:cc.AudioClip=null;
    // onLoad () {}

    //背景音乐
    @property(cc.AudioClip)
    bgm:cc.AudioClip=null;

    @property({
        displayName:"排行榜名字",
        type:[cc.Node],
        tooltip:"分数最高的10个人的姓名"
    })
    winnerName: cc.Node[] = [];

    @property({
        displayName:"排行榜头像",
        type:[cc.Node],
        tooltip:"分数最高的10个人的头像"
    })
    winnerAvatar: cc.Node[] = [];

    @property(cc.Node)
    MaxScore: cc.Node = null;

    private bgmId:number;

    start () {
        //隐藏介绍游戏界面
        this.node.getChildByName('Intro').active=false;
        this.node.getChildByName('Make').active=false;

        //播放音乐
        this.bgmId = cc.audioEngine.playMusic(this.bgm, true);
        cc.audioEngine.setVolume(this.bgmId, 0.6);

        //预加载开始游戏界面
        cc.director.preloadScene("jumpScene", function () {
            cc.log("Next scene preloaded");
        });

        //调用API获取自己最高得分和排行榜得分

    }



    startGame(){
        cc.audioEngine.playEffect(this.pauseSE,false);

        cc.audioEngine.stop(this.bgmId); 

        cc.log('开始游戏')
        //切换场景
        cc.director.loadScene("jumpScene");   
        
    }

    closeIntro(){
        cc.audioEngine.playEffect(this.pauseSE,false);
        this.node.getChildByName('Intro').active=false;
    }

    closeMake(){
        cc.audioEngine.playEffect(this.pauseSE,false);
        this.node.getChildByName('Make').active=false;
    }

    closeGameBackground(){
        cc.audioEngine.playEffect(this.pauseSE,false);
        this.node.getChildByName('gameBackground').active=false;
    }

    openIntro(){
        cc.audioEngine.playEffect(this.pauseSE,false);
        this.node.getChildByName('Intro').active=!this.node.getChildByName('Intro').active;
    }

    openMake(){
        cc.audioEngine.playEffect(this.pauseSE,false);
        this.node.getChildByName('Make').active=!this.node.getChildByName('Make').active;
    }

    // update (dt) {}
}
