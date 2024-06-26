import { _decorator, Collider2D, Component, Input, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import eventBus, { CollisionGroup, ItemEvents } from './constants';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    playerTarget: EventTarget; 
    body: RigidBody2D = null;
    // collider: Collider2D = null;
    leafIcon: Node;

    private speed: number = 11;
    private jumpForce: Vec2 = new Vec2(0, 5);
    private direction: Vec2 = new Vec2();
   
    private isOnGround: boolean = false;
    private itemSpace: number = 40; // > 25 ???

    private items: Node[] = []; 

    onLoad() {
        this.body = this.node.getComponent(RigidBody2D);
        // this.collider = this.node.getComponent(Collider2D);
        this.leafIcon = this.node.getChildByPath("Icons/Leaf Icon");
        this.leafIcon.active = false;
    }

    onDestroy() {
    }

    //
    public get_Speed() {
        return this.speed;
    }

    public set_x_Direction(x : number) {
        this.direction.x = x;
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



    /**
     * прыжок игрока.
     */
    jump() {
        if (!this.isOnGround) return;
        this.body.applyLinearImpulse(this.jumpForce, this.body.getWorldCenter(), true);
        this.isOnGround = false;
    }

    takeItem(node: Node) {
        setTimeout(() => {
            node.active = false;
            node.parent = null;
        },0.1)
        this.items.push(node);
        console.log(`leght of array: ${this.items.length}`);
        //
        this.leafIcon.active = true;
    }

    // putItem(v3: Vec3, node: Node) {
    putItem(v3: Vec3) {
        let node = this.items.pop();
        node.active = true;
        node.parent = this.node.parent;
        node.setPosition(v3.x + this.itemSpace, v3.y - 20, v3.z);
        //
        eventBus.emit(ItemEvents.SPAWN, node.position.x, node); // излучаем событие для черепахи
        //
        this.leafIcon.active = false;
    }
}

// разобраться с exlint и jsdoc - автодокуметирование