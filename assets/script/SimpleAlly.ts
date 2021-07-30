// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SimpleEnemy from "./SimpleEnemy";

const {ccclass, property} = cc._decorator;

export const State = {
    moving: 0, 
    attacking: 1
}

@ccclass
export default class SimpleAlly extends cc.Component {

    @property
    speed: number = 200;

    @property
    _designed_speed: number = 200;

    @property
    state: number = State.moving;

    @property
    _max_health: number = 100;

    @property
    health: number = 100;

    @property
    atk: number = 20;

    @property
    atkInterval: number = 1;

    @property
    contact_enemies: Array<SimpleEnemy> = []

    attackCallback: () => void=null;

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
        // TODO: 添加动画相关逻辑
    }

    /** 改变为攻击状态，同时改变速度和动画。 */
    private setAttacking() {
        this.state = State.attacking;
        this.speed = 0;
        if (this.contact_enemies.length != 0) {
            this.attackCallback = function () {
                if (this.contact_enemies.length != 0) {
                    this.contact_enemies[0].getDamaged(this.atk);
                    cc.log("enemy ",this.contact_enemies[0]," get hurt, rest")
                }
                
            }
        }
        this.schedule(this.attackCallback, this.atkInterval,cc.macro.REPEAT_FOREVER,0.5);

        // TODO: 添加动画相关逻辑
    }


    /** 添加接触的敌方单位。 */
    addContact(e: SimpleEnemy) {
        this.contact_enemies.push(e);
    }

    /** 减少接触的敌方单位（敌方单位死亡时调用）。 */
    removeContact(e: SimpleEnemy) {
        let index = this.contact_enemies.findIndex((i) => { return i.uuid == e.uuid; });
        if (index < 0) {
            // 找不到这个敌人？
            cc.error("deleting failed");
            return;
        }
        this.contact_enemies = this.contact_enemies.splice(index, 1);
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
        if (this.health <= 0) {
            this.health = 0;
            this.getKilled();
        }
    }

    /** 死亡，顺便播放动画。让父节点回收改节点进入对象池。 */
    private getKilled() {
        // TODO: 填充被击杀的逻辑

        this.node.destroy();
    }


    // ------------------------------- OVERLOADED --------------------------------- //
    // onLoad () {}

    start () {
        cc.log("ally",this.speed, this._designed_speed)
        this.setMoving();
    }

    update (dt) {
        let v_y = this.node.getComponent(cc.RigidBody).linearVelocity.y; 
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, v_y);

        if (this.state==State.attacking&&this.contact_enemies.length == 0) {
            this.setMoving();
        }
        if (this.state==State.moving&&this.contact_enemies.length != 0) {
            this.setAttacking();
        }
        
        if (this.state == State.moving) {
            // 播放运动动画
        }

        if (this.state == State.attacking) {
            // 播放攻击动画
        }
    }
    
    onBeginContact(contact, self, other) {
        if (self != null && other != null && self.getComponent(SimpleAlly) != null && other.getComponent(SimpleEnemy) != null) {
            
            //添加正在接触的敌人
            this.addContact(other.getComponent(SimpleEnemy));

        }
        
    }

    onEndContact(contact, self, other) {
        if (self != null && other != null && self.getComponent(SimpleAlly) != null && other.getComponent(SimpleEnemy) != null) {
            
            //从自己单方面销毁对方
            self.getComponent(SimpleAlly).removeContact(other.getComponent(SimpleEnemy));
            
        }
    }

}
