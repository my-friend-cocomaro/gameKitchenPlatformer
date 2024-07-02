import { _decorator, Animation, Collider2D, Component, Input, Node, RigidBody2D, Vec2, Vec3, PhysicsSystem2D } from 'cc';
import eventBus, { CollisionGroup, ItemEvents, PlayerAnim, PlayerEvents } from './constants';
import { Damageble } from './Damageble';
import { PlayerHandingKeyboardEvents } from './PlayerHandingKeyboardEvents';
import { PlayerMovement } from './PlayerMovement';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    playerTarget: EventTarget; 
    body: RigidBody2D = null;
    // collider: Collider2D = null;
    leafIcon: Node;

    private speed: number = 7;
    private jumpForce: Vec2 = new Vec2(0, 7);
    private direction: Vec2 = new Vec2();
   
    private isOnGround: boolean = false;
    private itemSpace: number = 25; // > 25 ???
    private animation: Animation;
    public damageble: Damageble;

    public items: Node[] = []; 
    public enemy: Node;

    public weaponDamage: number = 1;
    public weaponRange: number = 25;

    onLoad() {
        this.enemy = this.node.parent.getChildByName('Enemy');
        this.animation = this.node.getComponent(Animation);
        this.body = this.node.getComponent(RigidBody2D);
        // this.collider = this.node.getComponent(Collider2D);
        // this.leafIcon = this.node.getChildByPath("Icons/Leaf Icon");
        // this.leafIcon.active = false;
        this.animation.on(Animation.EventType.FINISHED, this.animFinished, this);
        this.damageble = this.node.getComponent(Damageble);
    }

    tmp_anim_finished: boolean;
    animFinished(event: Animation.EventType, state: any) {
        if (state.name != PlayerAnim.idle && state.name != PlayerAnim.run) {
            this.tmp_anim_finished = true;
        }        
    }

    onDestroy() {
    }

    //
    public get_Speed() {
        return this.speed;
    }

    tmp_x_dir: number = 1;
    public set_x_Direction(x : number) {
        if (x != 0) this.tmp_x_dir = x;
        //
        this.node.setScale(new Vec3((x != 0) ? ((x > 0) ? 1 : -1) : this.tmp_x_dir , 1, 1));
        // this.leafIcon.setScale(new Vec3(1,1,1));

        //
        this.direction.x = x;
        //
        // if (!this.isOnGround) return; //
        //
        // if (x == 0) { // почему ломается анимация, если подключить движение?
        //     // this.playAnim(PlayerAnim.idle);
        //     // this.animation.stop();
        // } else { // -1\1
        //     this.playAnim(PlayerAnim.run);
        // }
        //
    } 

    public playAnim(anim: PlayerAnim) {
        // this.animation.stop();
        // if (!this.tmp_anim_finished) return;
        //
        // this.animation.stop();
        this.animation.play(anim);
    }

    public get_x_Direction() {
        return this.direction.x;
    }

    /**
     * Устанавливает состояние нахождения на земле.
     * @param {boolean} isGrounded - Флаг нахождения на земле.
     */
    public setGrounded(isGrounded: boolean) {
        this.isOnGround = isGrounded;
    }

    /**
     * Получает состояние нахождения на земле.
     * @param {boolean} isGrounded - Флаг нахождения на земле.
     */ 
    public getGrounded() : boolean {
        return this.isOnGround;
    }

    takeDamage(hitNumber: number) {
        let isDead = this.damageble.takeDamage(hitNumber);
        if (isDead) {
            setTimeout(() => { 
                let plHand = this.node.getComponent(PlayerHandingKeyboardEvents);
                let plMove = this.node.getComponent(PlayerMovement);
                plHand.destroy();
                plMove.destroy();
            }
            , 0.1);  
            this.playAnim(PlayerAnim.die);
        } else {
            this.playAnim(PlayerAnim.damage);
        }
        eventBus.emit(PlayerEvents.takeDamage, hitNumber);
    }


    /**
     * атака игрока
    */
    attack() {
        this.playAnim(PlayerAnim.attack);
    }

    /**
     * прыжок игрока.
     */
    jump() {
        if (!this.isOnGround) return;
        //
        this.body.applyLinearImpulse(this.jumpForce, this.body.getWorldCenter(), true);
        this.isOnGround = false;
        //
        this.playAnim(PlayerAnim.jump);
    }

    takeItem(node: Node) {
        setTimeout(() => {
            node.active = false;
            node.parent = null;
        },0.1)
        this.items.push(node);
        console.log(`leght of array: ${this.items.length}`);
        //
        // this.leafIcon.active = true;
        //
        // this.animation.stop();
        this.playAnim(PlayerAnim.take);
    }

    // putItem(v3: Vec3, node: Node) {
    putItem(v3: Vec3) {
        let node = this.items.pop();
        node.active = true;
        node.parent = this.node.parent;
        node.setPosition(v3.x + (this.tmp_x_dir * this.itemSpace), v3.y - 20, v3.z);
        //
        eventBus.emit(ItemEvents.SPAWN, node.position.x, node); // излучаем событие для черепахи
        // 
        // this.leafIcon.active = false;
        //
        // this.animation.stop();
        this.playAnim(PlayerAnim.put);
    }

    //
    KnifeHit() {
        if (Math.abs(this.node.position.x - this.enemy.position.x) <= this.weaponRange) {
            this.enemy.getComponent(Enemy).takeDamage(this.weaponDamage); 
        }
    }
}

// разобраться с exlint и jsdoc - автодокуметирование