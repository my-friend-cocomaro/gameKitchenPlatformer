import { _decorator, Collider2D, Component, Input, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import { CollisionGroup } from './constants';
const { ccclass, property } = _decorator;

/*
 model -> keep date
     and have funcion to call
*/

@ccclass('Player')
export class Player extends Component {
    body: RigidBody2D = null;
    collider: Collider2D = null;

    private speed: number = 11;
    private jumpForce: Vec2 = new Vec2(0, 40);
    private direction: Vec2 = new Vec2();
   
    private isOnGround: boolean = false;
    private itemSpace: number = 25 + 40; // > 25 ???

    private items: Node[] = []; 

    public set_x_Direction(x : number) {
        this.direction.x = x;
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


    onLoad() {
        this.body = this.node.getComponent(RigidBody2D);
        this.collider = this.node.getComponent(Collider2D);
    }

    onDestroy() {
    }

    /*
     * Обработка прыжка игрока.
     */
    jump() { 
        this.body.applyLinearImpulse(this.jumpForce, this.body.getWorldCenter(), true);
        this.isOnGround = false;
    }

    takeItem(node: Node) {
        setTimeout(() => {
            node.active = false;
        },0.1)
        this.items.push(node);
        console.log(`leght of array: ${this.items.length}`);
    }

    // putItem(v3: Vec3, node: Node) {
    putItem(v3: Vec3) {
        let node = this.items.pop();
        node.active = true;
        node.setPosition(v3.x + this.itemSpace, v3.y, v3.z);
        //
    }
    
    /**
     * Обновление состояния компонента.
     * @param {number} deltaTime - Время с последнего обновления.
     */
    update(deltaTime: number) {
        const velocity = this.body.linearVelocity;
        velocity.x = this.direction.x * this.speed;
        this.body.linearVelocity = velocity;
    }
}


/*
разобраться с exlint и jsdoc - автодокуметирование
*/
