// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import JumpEvent from "./jumpEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneManager extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    
    @property(cc.Node)
    platform: cc.Node = null

    //细胞核
    @property(cc.Node)
    nucleus: cc.Node = null

    //提示框
    @property(cc.Label)
    scoreBlock: cc.Label = null


    //怪物种类
    @property({
        displayName:"敌人",
        type:[cc.Prefab],
        tooltip:"敌人种类"
    })
    allies: cc.Prefab[] = [];

    // 游戏失败提示框
    @property(cc.Node)
    gameFailureBlock: cc.Node = null;
    

    //线粒体道具
    @property({
        displayName: "线粒体",
        type: cc.Prefab,
        tooltip: "可以连续跳跃一段时间的道具"
    })
    xianliti: cc.Prefab = null;

    //道具条
    @property(cc.Node)
    propBar: cc.Node = null;

    //无限跳跃
    @property(cc.Node)
    jumpLabel: cc.Node = null;

    //任务完成提示
    @property(cc.Node)
    taskFinishedLabel: cc.Node = null;

    //速度提升提醒
    @property(cc.Node)
    speedUpLabel: cc.Node = null;

    //当前怪物
    curAllies: cc.Node[] = [];

    //当前道具
    curProp: cc.Node[] = [];

    //画面移动速度
    movingSpeed: number = 3

    //当前得分
    gameScore: number = 0

    //每日任务是否完成
    dailyTask: boolean = false

    //游戏是否暂停
    gamePaused: boolean = false

    //游戏开始
    gameStarted: boolean = false


    onLoad (){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = 1;
        cc.director.getCollisionManager().enabled = true;

        this.propBar.active = false;
        this.jumpLabel.active = false;
        this.taskFinishedLabel.active = false;
        this.speedUpLabel.active = false;
        this.gameFailureBlock.active = false;

        //建立定时器
        setInterval(()=>{
            if(this.gamePaused){
                return
            }

            //产生一个新的
            let index = Math.round(Math.random()*4)
            if (index >= this.allies.length){
                return
            }
            let newNode = cc.instantiate(this.allies[index])
            this.curAllies.push(newNode)
            this.node.addChild(newNode)
            
            
        },2400)

        //道具定时器
        setInterval(()=>{
            if(this.gamePaused){
                return
            }
            //产生一个新的
            let newNode = cc.instantiate(this.xianliti)
            this.curProp.push(newNode)
            this.node.addChild(newNode)
            cc.log("产生了新的道具")
        },36000)

        // 调取API，判断本日任务是否已完成
        this.gamePaused = true
    }

    start () {

        //所有元素向左移动
        this.platform = this.node.getChildByName("platform")
        this.nucleus = this.node.getChildByName("nucleus")

        this.scoreBlock = this.node.parent.getChildByName("bar").getChildByName("crystalAmount").getComponent(cc.Label)
        this.scoreUpdate()
    }

    update (dt) {
        if(this.gamePaused){
            return
        }

        this.platform.x = this.platform.x - this.movingSpeed
        //当坐标到达某一位置时，重置位置
        if (this.platform.x <= -288.031){
            this.platform.x = 340.904
        }
        this.nucleus.x = this.nucleus.x - this.movingSpeed
        if (this.nucleus.x <= -1200){
            this.nucleus.x = 900
        }

        //怪物的移动
        for(let i = 0; i < this.curAllies.length; ++i){
            this.curAllies[i].x = this.curAllies[i].x - this.movingSpeed
        }

        for(let i = 0; i < this.curProp.length; ++i){
            this.curProp[i].x = this.curProp[i].x - this.movingSpeed
        }

        let removeAllies = false
        do {
            for (let i = 0; i < this.curAllies.length; ++i){
                if (this.curAllies[i].x <= -800){
                    this.curAllies[i].destroy()
                    removeAllies = true
                    cc.log(this.curAllies.length)
                    this.curAllies=this.curAllies.slice(0,i).concat(this.curAllies.slice(i+1))
                    cc.log(this.curAllies.length)

                    this.getScore()
                    break
                }
                removeAllies = false
                //console.log("不要死循环")
            }
            
        }
        while (removeAllies && this.curAllies.length > 0)

        let removeProps = false
        do {
            for (let i = 0; i < this.curProp.length; ++i){
                if (this.curProp[i].x <= -800){
                    this.curProp[i].destroy()
                    removeProps = true
                    cc.log(this.curProp.length)
                    this.curProp=this.curProp.slice(0,i).concat(this.curProp.slice(i+1))
                    
                    cc.log(this.curProp.length)

                    break
                }
                removeProps = false
                //console.log("不要死循环")
            }
            
        }
        while (removeProps && this.curProp.length > 0)
        
        if(this.propBar.active){
            this.propBar.getComponent(cc.ProgressBar).progress -= 0.001
            if (this.propBar.getComponent(cc.ProgressBar).progress <= 0){
                this.propBar.active = false

                //无限跳跃关闭
                this.node.parent.getComponent(JumpEvent).maxJumpAmount = 2
            }
        }
    }

    getScore(){
        this.gameScore += 1

        this.movingSpeed = 3 + this.gameScore / 20

        if (this.gameScore % 20 == 0){
            this.speedUpLabel.active = true;
            setTimeout(() => {
                this.speedUpLabel.active = false;
            }, 2400);
        }

        if (this.gameScore == 25 && !this.dailyTask){
            //发送任务完成API
            this.taskFinishedLabel.active = true
            this.dailyTask = true;
            setTimeout(() => {
                this.taskFinishedLabel.active = false;
            }, 2400);
        }
        
        this.scoreUpdate()
    }

    scoreUpdate(){
        if (this.dailyTask){
            this.scoreBlock.string = String(this.gameScore) + " / 任务完成"
        }
        else {
            this.scoreBlock.string = String(this.gameScore) + " / 25"

            //判断任务是否完成
            if (this.gameScore >= 25){
                //发送API
            }
        }
    }

    //吃到道具
    getProp(){
        cc.log("道具被激活")
        this.propBar.getComponent(cc.ProgressBar).progress = 1
        this.propBar.active = true;
        //无限跳跃
        this.node.parent.getComponent(JumpEvent).maxJumpAmount = 999

        this.jumpLabel.active = true;
        setTimeout(() => {
            this.jumpLabel.active = false;
        }, 2400);
    }

    //暂停游戏
    gamePause(){
        if(!this.gameStarted){
            return
        }
        this.gamePaused = !this.gamePaused;
    }

    //回到首页
    gotoHome(){
        cc.director.loadScene("startScene");   
    }

    //游戏失败
    gameFail(){
        this.gameFailureBlock.active = true;
        this.gamePaused = true
        //发送API，上传最新记录
    }

    //重新开始游戏
    gameRestart() {
        cc.director.loadScene("jumpScene");   
    }
}
