// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;


import SimpleAlly from "./SimpleAlly";
import Nucleus from "./Nucleus";

const State = {
    moving: 0, 
    attacking: 1,
    falling:2,
    dying: 3
}


@ccclass
export default class SimpleEnemy extends cc.Component {

    @property
    _speed: number = -50;

    @property
    designedSpeed: number = -50;

    @property
    state: number = State.moving;

    @property
    maxHealth: number = 150;

    @property
    _health: number = 160;

    @property
    atk: number = 15;

    @property
    atkInterval: number = 1;

    @property()
    unitName: string = "";

    @property()
    atpWorth: number = 10;

    @property(cc.AudioClip)
    deadSoundEffect: cc.AudioClip = null;

    @property(cc.AudioClip)
    attackSoundEffect: cc.AudioClip = null;

    attackCallback: () => void = null;

    animManager: cc.Animation = null;

    contactAllies: Array<SimpleAlly> = []

    contactNucleus: Nucleus = null;

    // LIFE-CYCLE CALLBACKS:
    // ------------------------------------ METHODS ------------------------------------ //
    /** 改变为运动状态，同时改变速度和动画。 */
    private setMoving() {
        this.state = State.moving;
        this._speed = this.designedSpeed;
        if (this.attackCallback != null) {
            this.unschedule(this.attackCallback);
            this.attackCallback = null;
        }
        this.animManager.stop();
        this.animManager.play(this.unitName + "-walk")
    }

    /** 改变为攻击状态，同时改变速度和动画。 */
    private setAttacking() {
        this.state = State.attacking;
        this._speed = 0;
        
        this.attackCallback = () => {
            if (this.contactAllies.length != 0) {
                this.animManager.stop();
                this.animManager.play(this.unitName + "-attack")
                this.contactAllies[0].getDamaged(this.atk);
            }
            else if (this.contactNucleus != null){
                this.animManager.stop();
                this.animManager.play(this.unitName + "-attack")
                this.contactNucleus.getDamaged(this.atk);
            }
            cc.audioEngine.playEffect(this.attackSoundEffect, false);
        }
        this.schedule(this.attackCallback, this.atkInterval, cc.macro.REPEAT_FOREVER, 0.5);
    }

    /** 改变为下落状态，同时改变速度和动画。 */
    private setFalling() {
        this.state = State.falling;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1);
    }


    /** 添加接触的敌方单位。 */
    addContact(a: SimpleAlly) {
        // cc.log("add ally", a.uuid);
        this.contactAllies.push(a);
    }

    /** 减少接触的敌方单位（敌方单位死亡时调用）。 */
    removeContact(a: SimpleAlly) {
        if (a == null)
        {
            cc.error("a is null");
            return;
        }
        this.contactAllies = this.contactAllies.filter((i) => { return i.uuid != a.uuid; });

        // cc.log("remove ally", a.uuid, " from ", this.uuid);
        // cc.log("length of rest contacts", this.contactAllies.length);
    } 
    
    /** 受到伤害。 */
    getDamaged(d: number) {
        this._health -= d;
        // cc.log("enemy ", this.uuid, " get hurt, rest ", this._health);
        if (this._health <= 0) {
            this._health = 0;
            this.node.getChildByName("progressBar").getComponents(cc.ProgressBar)[0].progress=0;
            this.getKilled();
        }
        else{
            this.node.getChildByName("progressBar").getComponents(cc.ProgressBar)[0].progress=this._health/this.maxHealth;
        }
        
    }

    /** 死亡，顺便播放动画。让父节点回收改节点进入对象池。 */
    private getKilled() {
        cc.log("enemy ", this.uuid, " died ");
        this.animManager.stop();
        this.animManager.play("die");
        //播放死亡音效
        cc.audioEngine.playEffect(this.deadSoundEffect, false);
        this.node.dispatchEvent( new cc.Event("enemyDied" + this.unitName, true) );
        this.state = State.dying;
        this.getComponent(cc.RigidBody).destroy();
        this.node.getChildByName("progressBar").destroy();
        setTimeout(() => {this.node.destroy();}, 1500);
    }


    // ------------------------------- OVERLOADED --------------------------------- //
    // onLoad () {}

    start() {
        this.node.getComponent(cc.RigidBody).fixedRotation = true;
        this._speed = this.designedSpeed;
        this._health = this.maxHealth;
        cc.log("enemy:", this.uuid, " health:", this._health, " atk:", this.atk, " speed:", this._speed)
        this.setFalling();
        this.animManager = this.getComponent(cc.Animation);
    }

    update(dt) {
        
        if (this.state == State.falling) {
            this.node.getComponent(cc.RigidBody).linearVelocity.x = 0;
        }

        if (this.state == State.moving) {
            // 播放运动动画
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this._speed, 0);
        }

        if (this.state == State.attacking) {
            // 播放攻击动画
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }

        if (this.state == State.falling && this.node.getComponent(cc.RigidBody).linearVelocity.y == 0) {
            this.setMoving();
        }

        if (this.state == State.attacking && (this.contactAllies.length == 0 && this.contactNucleus==null)) {
            
            this.setMoving();
        }
        if (this.state==State.moving&&(this.contactAllies.length != 0||this.contactNucleus!=null)) {
            this.setAttacking();
        }

    }

    
    onBeginContact(contact, self, other) {
        if (self != null && other != null && self.getComponent(SimpleEnemy) != null && other.getComponent(SimpleAlly) != null) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            //添加正在接触的敌人
            this.addContact(other.getComponent(SimpleAlly));
        }
        if (self != null && other != null && self.getComponent(SimpleEnemy) != null && other.getComponent(Nucleus) != null) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            //添加正在接触的细胞核
            // cc.log("begin contacting the nucleus");
            this.contactNucleus = other.getComponent(Nucleus);
        }
    }

    onEndContact(contact, self, other) {
        if (self != null && other != null && self.getComponent(SimpleEnemy) != null && other.getComponent(SimpleAlly) != null) {
            
            //从自己单方面销毁对方
            self.getComponent(SimpleEnemy).removeContact(other.getComponent(SimpleAlly));
            
        }
        if (self != null && other != null && self.getComponent(SimpleEnemy) != null && other.getComponent(Nucleus) != null) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            //销毁正在接触的细胞核
            // cc.log("end contacting the nucleus");
            this.contactNucleus = null;

        }
    }
}
