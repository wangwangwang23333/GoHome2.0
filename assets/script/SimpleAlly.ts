// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SimpleEnemy from "./SimpleEnemy";

const {ccclass, property} = cc._decorator;

const State = {
    moving: 0, 
    attacking: 1,
    falling:2,
    dying: 3
}

@ccclass
export default class SimpleAlly extends cc.Component {

    @property
    _speed: number = 50;

    @property
    designedSpeed: number = 50;

    @property
    state: number = State.moving;

    @property
    maxHealth: number = 100;

    @property
    _health: number = 100;

    @property
    atk: number = 20;

    @property
    atkInterval: number = 1;

    @property
    contactEnemies: Array<SimpleEnemy> = []

    @property()
    unitName: string = "";

    @property(cc.AudioClip)
    deadSoundEffect: cc.AudioClip = null;

    @property(cc.AudioClip)
    attackSoundEffect: cc.AudioClip = null;

    animManager: cc.Animation = null;

    attackCallback: () => void = null;


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
        // TODO: 添加动画相关逻辑
        cc.log("anim playing " + this.unitName + "-walk")
        this.animManager.play(this.unitName + "-walk");
    }

    /** 改变为攻击状态，同时改变速度和动画。 */
    private setAttacking() {
        this.state = State.attacking;
        this._speed = 0;
        this.attackCallback = () => {
            if (this.contactEnemies.length != 0) {
                this.animManager.stop();
                this.animManager.play(this.unitName + "-attack")
                this.contactEnemies[0].getDamaged(this.atk);
                cc.audioEngine.playEffect(this.attackSoundEffect, false)
            }
        }
        this.schedule(this.attackCallback, this.atkInterval, cc.macro.REPEAT_FOREVER, this.atkInterval);
    }

    /** 改变为下落状态，同时改变速度和动画。 */
    private setFalling() {
        
        this.state = State.falling;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1);
        // TODO: 添加动画相关逻辑
    }


    /** 添加接触的敌方单位。 */
    addContact(e: SimpleEnemy) {
        // cc.log("add enemy", e.uuid);
        this.contactEnemies.push(e);
    }

    /** 减少接触的敌方单位（敌方单位死亡时调用）。 */
    removeContact(e: SimpleEnemy) {
        if (e == null)
        {
            cc.error("e is null");
            return;
        }
        this.contactEnemies = this.contactEnemies.filter((i) => { return i.uuid != e.uuid; });

        // cc.log("remove ally", e.uuid, " from ", this.uuid);
        // cc.log("length of rest contacts", this.contactEnemies.length);
    }
    
    /** 受到伤害。 */
    getDamaged(d: number) {
        this._health -= d;
        // cc.log("ally ", this.uuid, " get hurt, rest ", this._health);
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
        cc.log("ally ", this.uuid, " died ");
        this.animManager.stop();
        this.animManager.play("die");
        cc.audioEngine.playEffect(this.deadSoundEffect, false);
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
        cc.log("ally:",this.uuid," health:",this._health," atk:",this.atk," speed:",this._speed)
        this.setFalling();
        this.animManager = this.node.getComponent(cc.Animation)
    }

    update(dt) {
        

        if (this.state == State.falling) {
            
            this.node.getComponent(cc.RigidBody).linearVelocity.x = 0;
        }

        if (this.state == State.moving) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this._speed, 0);
        }

        if (this.state == State.attacking) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }

        if (this.state == State.falling && this.node.getComponent(cc.RigidBody).linearVelocity.y == 0) {
            this.setMoving();
        }

        if (this.state == State.attacking && this.contactEnemies.length == 0) {
            
            this.setMoving();
        }
        if (this.state == State.moving && this.contactEnemies.length != 0) {
            this.setAttacking();
        }
    }
    
    onBeginContact(contact, self, other) {
        // cc.log(self.node.group);
        if (self != null && other != null && self.node.group == "ally" && other.node.group == "enemy" ) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            //添加正在接触的敌人
            this.addContact(other.getComponent(SimpleEnemy));
            // cc.log(this.unitName + " contacting enemy")
        }
        
    }

    onEndContact(contact, self, other) {
        if (self != null && other != null && self.getComponent(SimpleAlly) != null && other.getComponent(SimpleEnemy) != null) {
            //从自己单方面销毁对方
            self.getComponent(SimpleAlly).removeContact(other.getComponent(SimpleEnemy));
            
        }

    }

}
