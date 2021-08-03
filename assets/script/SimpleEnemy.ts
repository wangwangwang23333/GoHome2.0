// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;


import SimpleAlly from "./SimpleAlly";

const State = {
    moving: 0, 
    attacking: 1,
    falling:2
}


@ccclass
export default class SimpleEnemy extends cc.Component {

    @property
    speed: number = -50;

    @property
    _designed_speed: number = -50;

    @property
    state: number = State.moving;

    @property
    _max_health: number = 150;

    @property
    health: number = 160;

    @property
    atk: number = 15;

    @property
    atkInterval: number = 1;

    @property
    contact_allies: Array<SimpleAlly> = []

    attackCallback: () => void = null;

    @property
    anim_name: string = 'move'

    // LIFE-CYCLE CALLBACKS:
    // ------------------------------------ METHODS ------------------------------------ //
    /** 改变为运动状态，同时改变速度和动画。 */
    private setMoving() {
        

        this.state = State.moving;
        this.speed = this._designed_speed;
        if (this.attackCallback != null) {
            this.unschedule(this.attackCallback);
            this.attackCallback = null;
        }
        this.getComponent(cc.PhysicsBoxCollider).density = 10000 / this.speed;
        // TODO: 添加动画相关逻辑
    }

    /** 改变为攻击状态，同时改变速度和动画。 */
    private setAttacking() {
        

        this.state = State.attacking;
        this.speed = 0;
        if (this.contact_allies.length != 0) {
            this.attackCallback = function () {
                if (this.contact_allies.length != 0) {
                    this.contact_allies[0].getDamaged(this.atk);
                }
            }
        }
        this.schedule(this.attackCallback, this.atkInterval,cc.macro.REPEAT_FOREVER,0.5);
        this.getComponent(cc.PhysicsBoxCollider).density = 100000000;
        // TODO: 添加动画相关逻辑
    }

    /** 改变为下落状态，同时改变速度和动画。 */
    private setFalling() {
        
        this.state = State.falling;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1);
        this.getComponent(cc.PhysicsBoxCollider).density = 100;
        // TODO: 添加动画相关逻辑
    }


    /** 添加接触的敌方单位。 */
    addContact(a: SimpleAlly) {
        cc.log("add ally", a.uuid);
        this.contact_allies.push(a);
    }

    /** 减少接触的敌方单位（敌方单位死亡时调用）。 */
    removeContact(a: SimpleAlly) {
        if (a == null)
        {
            cc.error("a is null");
            return;
        }
        this.contact_allies = this.contact_allies.filter((i) => { return i.uuid != a.uuid; });

        cc.log("remove ally", a.uuid, " from ", this.uuid);
        cc.log("length of rest contacts", this.contact_allies.length);
        
    } 

    /** 设置移动速度值，不改变当前移动速度。 */ 
    setDesignedSpeed(temp: number) {
        // TODO: 更多限制
        if (temp < 0) {
            return;
        }
        this._designed_speed = temp;
    }
    
    /** 受到伤害。 */
    getDamaged(d: number) {
        this.health -= d;
        cc.log("enemy ", this.uuid, " get hurt, rest ", this.health);
        if (this.health <= 0) {
            this.health = 0;
            this.getKilled();
        }
        
    }

    /** 死亡，顺便播放动画。让父节点回收改节点进入对象池。 */
    private getKilled() {
        // TODO: 填充被击杀的逻辑
        cc.log("enemy ", this.uuid, " died ");
        this.node.destroy();
    }


    // ------------------------------- OVERLOADED --------------------------------- //
    // onLoad () {}

    start() {
        this.node.getComponent(cc.RigidBody).fixedRotation = true;
        cc.log("enemy:", this.uuid, " health:", this.health, " atk:", this.atk, " speed:", this.speed)
        this.setFalling();
    }

    update(dt) {

        if (this.node.getComponent(cc.RigidBody).linearVelocity.x != 0) {
            this.node.getComponent(cc.PhysicsBoxCollider).density = 10000/this.node.getComponent(cc.RigidBody).linearVelocity.x;
        }
        else
        {
            this.node.getComponent(cc.PhysicsBoxCollider).density = 10000;
        }

        
        if (this.state == State.falling) {
            this.node.getComponent(cc.RigidBody).linearVelocity.x = 0;
        }

        if (this.state == State.moving) {
            // 播放运动动画
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        }

        if (this.state == State.attacking) {
            // 播放攻击动画
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }

        if (this.state == State.falling && this.node.getComponent(cc.RigidBody).linearVelocity.y == 0) {
            this.setMoving();
        }

        if (this.state == State.attacking && this.contact_allies.length == 0) {
            
            this.setMoving();
        }
        if (this.state==State.moving&&this.contact_allies.length != 0) {
            this.setAttacking();
        }
        
        

    }

    
    onBeginContact(contact, self, other) {
        if (self != null && other != null && self.getComponent(SimpleEnemy) != null && other.getComponent(SimpleAlly) != null) {
            
            //添加正在接触的敌人
            this.addContact(other.getComponent(SimpleAlly));

        }
    }

    onEndContact(contact, self, other) {
        if (self != null && other != null && self.getComponent(SimpleEnemy) != null && other.getComponent(SimpleAlly) != null) {
            
            //从自己单方面销毁对方
            self.getComponent(SimpleEnemy).removeContact(other.getComponent(SimpleAlly));
            
        }
    }
}
