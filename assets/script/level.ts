// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //是否生产ATP
    public isMakeATP:boolean=true;

    @property({
        displayName:"己方单位",
        type:[cc.Prefab],
        tooltip:"己方单位种类"
    })
    allies: cc.Prefab[] = [];

    @property({
        displayName: "敌人顺序",
        tooltip: "敌人顺序",
        type: [cc.Integer]
    })
    enemySequence: number[] = [];

    @property({
        displayName: "",
        tooltip: "",
        type: [cc.Float]
    })
    enemyInterval: number[] = []

    @property({
        displayName: "敌方单位",
        tooltip: "敌方单位种类",
        type: [cc.Prefab]
    })
    enemies: cc.Prefab[] = [];

    @property({
        displayName: "友军初始位置节点",
        tooltip: "友军初始位置节点",
        type: cc.Node
    })
    allyInitPositoin: cc.Node = null;

    @property({
        displayName: "敌方初始位置节点",
        tooltip: "敌方初始位置节点",
        type: cc.Node
    })
    enemyInitPositoin: cc.Node = null;

    @property({
        displayName: "ATP 值",
        tooltip: "ATP 值",
        type: cc.Node
    })
    atpAmount: cc.Node = null;

    @property({
        displayName: "结晶值",
        tooltip: "结晶值",
        type: cc.Node
    })
    crystalAmount: cc.Node = null;

    @property({
        displayName: "敌人名称",
        type: [cc.String]
    })
    enemyNames: Array<string> = [];

    @property({
        displayName: "敌人ATP奖励",
        type: [cc.Integer]
    })
    enemyWorth: Array<number> = []

    @property({
        displayName: "友方价格",
        type: [cc.Integer]
    })
    allyWorth: Array<number> = []

    @property(cc.Prefab)
    ATPGain:cc.Prefab=null;

    //背景音乐
    @property(cc.AudioClip)
    bgm:cc.AudioClip=null;

    //暂停键音效
    @property(cc.AudioClip)
    pauseSE:cc.AudioClip=null;

    //成功购买音效
    @property(cc.AudioClip)
    successBuySE:cc.AudioClip=null;

    //失败购买音效
    @property(cc.AudioClip)
    failBuySE:cc.AudioClip=null;

    @property(cc.AudioClip)
    gainATPSE:cc.AudioClip=null;

    leftEnemies: number = 100;

    private bgmId:number;

    // LIFE-CYCLE CALLBACKS:
    //当前关卡
    @property
    curLevel:number=1;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = 1;
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;ß

        //隐藏过关界面
        this.node.parent.getChildByName('scenePassed').active=false;

        //隐藏失败界面
        this.node.parent.getChildByName('Failure').active=false;

        //播放背景音乐
        this.bgmId = cc.audioEngine.playMusic(this.bgm, true);
        cc.audioEngine.setVolume(this.bgmId, 1);

        //预加载新关卡
        if(this.curLevel==1){
            cc.director.preloadScene("level2", function () {
                cc.log("Next scene preloaded");
            });
        }
        else if (this.curLevel==2){
            cc.director.preloadScene("level3", function () {
                cc.log("Next scene preloaded");
            });
        }
        else{
            cc.director.preloadScene("level4", function () {
                cc.log("Next scene preloaded");
            });
        }

        for (let i = 0; i < this.enemies.length; i++) {
            this.node.on("enemyDied" + this.enemyNames[i], (event) => {
                this.leftEnemies -= 1;
                //敌人死亡
                this.atpAmount.getComponent(cc.Label).string = 
                    "" + (Number(this.atpAmount.getComponent(cc.Label).string) + this.enemyWorth[i])
                
                if ((this.enemies.length - this.leftEnemies) % 10 == 0) {
                    this.crystalAmount.getComponent(cc.Label).string = 
                        "" + (Number(this.crystalAmount.getComponent(cc.Label).string) + 1);
                }
                // cc.log("当前剩余怪物为",this.leftEnemies)
                if (this.leftEnemies <= 0) {
                    
                    this.completeScene();
                }
            });
        }
    }

    createAlly(e, i) {
        console.log("add ally number ", i);

        let prefab = this.allies[i - 1];

        // TODO: 检查剩余多少钱，够不够买
        if (Number(this.atpAmount.getComponent(cc.Label).string) >= this.allyWorth[i-1]){
            //成功购买音效
            cc.audioEngine.playEffect(this.successBuySE, false);

            this.atpAmount.getComponent(cc.Label).string = 
                    "" + (Number(this.atpAmount.getComponent(cc.Label).string) - this.allyWorth[i-1])
            let ally = cc.instantiate(prefab);
            ally.setParent(this.node);
            ally.position = this.allyInitPositoin.position;
        }
        else{
            //钱不够
            cc.audioEngine.playEffect(this.failBuySE, false);
        }
    }

    createEnemy(i) {
        if (i < 1 || i > this.enemies.length) return;

        console.log("add enemy number ", i);
        let prefab = this.enemies[i-1]

        let enemy = cc.instantiate(prefab)
        enemy.setParent(this.node)
        enemy.position = this.enemyInitPositoin.position;
    }

    private
    completeScene() {
        // TODO: complete this
        //cc.director.pause();

        //停止生产ATP
        this.isMakeATP=false;

        setTimeout(()=>{//出现暂停框
            this.node.parent.getChildByName('scenePassed').active=true;},
            1000);

        cc.log("通关！");
    }

    //前往下一关
    gotoNextLevel(){
        console.log('前往下一关')
        cc.audioEngine.playEffect(this.pauseSE,false);

        cc.audioEngine.stop(this.bgmId); 

        if(this.curLevel==1){
            cc.director.loadScene("level2");
        }
        else if (this.curLevel==2){
            cc.director.loadScene("level3");
        }
        else{
            cc.director.loadScene("level4");
        }

        //取消暂停状态
        //cc.director.resume();

    }

    //回到首页
    gotoHome(){
        cc.audioEngine.playEffect(this.pauseSE,false);

        cc.audioEngine.stop(this.bgmId); 

        cc.director.loadScene("startScene");
    }

    // --   Life Cycle Callbacks -- //
    start () {
        let i = 0;
        this.leftEnemies = this.enemySequence.length;
        cc.log("初始怪物数量为",this.leftEnemies)

        cc.log(this.atpAmount)
        cc.log(this.crystalAmount)

        let timer = setInterval(() => {
            if (i < this.enemySequence.length) {
                this.createEnemy(this.enemySequence[i]);
                i += 1;
            } else {
                clearInterval(timer);
            }
        },  this.enemyInterval[i] * 1000)

        let atpGainer = setInterval(() => {
            //创建一个ATP图片，移动到位置
            
            let img=cc.instantiate(this.ATPGain);
            this.node.addChild(img); 
            

        }, 1000)
    }

    //游戏暂停键
    gamePause(){
        cc.audioEngine.playEffect(this.pauseSE,false);
        
        if(cc.game.isPaused()){
            this.isMakeATP=true;
            cc.game.resume();
        }
        else{
            //停止生产ATP
            this.isMakeATP=false;
            setTimeout(()=>{cc.game.pause();},300);
        }
    }

    //获取ATP
    gainATP(){
        if(this.isMakeATP){
            let crystal = (Number(this.crystalAmount.getComponent(cc.Label).string));
            this.atpAmount.getComponent(cc.Label).string = 
                    "" + (Number(this.atpAmount.getComponent(cc.Label).string) + 10 + crystal);
                
            cc.audioEngine.play(this.gainATPSE,false,0.3);
        }
    }

    //游戏失败
    fail(){
        //停止生产ATP
        this.isMakeATP=false;

        //出现暂停框
        this.node.parent.getChildByName('Failure').active=true;
    }

    //重新开始游戏
    retry(){
        console.log('重新尝试')
        cc.audioEngine.playEffect(this.pauseSE,false);

        if(this.curLevel==1){
            cc.director.loadScene("level1");
        }
        else if (this.curLevel==2){
            cc.director.loadScene("level2");
        }
        else if (this.curLevel==2){
            cc.director.loadScene("level3");
        }
        else{
            cc.director.loadScene('level4');
        }

        //取消暂停状态
        cc.director.resume();
    }


    // update (dt) {}
}
