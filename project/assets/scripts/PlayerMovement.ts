import { _decorator, Component, Node, RigidBody2D, Vec2, Vec3, input, Input, EventKeyboard, KeyCode, Prefab, instantiate, log, Collider2D, Contact2DType, CCInteger } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;


/**
 * Управляет движением игрока.
 * @class PlayerMovement
 */
@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    private body: RigidBody2D = null;
    private player: Player = null;
    /**
     * Инициализация компонента. Настройка обработчиков событий.
     */
    onLoad() {
        console.log("Movements is inited");
        //
        this.body = this.node.getComponent(RigidBody2D);
        this.player = this.node.getComponent(Player);
    }
   
    /**
     * Обновление состояния компонента.
     * @param {number} deltaTime - Время с последнего обновления.
     */
    update(deltaTime: number) {
        const velocity = this.body.linearVelocity;
        velocity.x = this.player.get_x_Direction() * this.player.get_Speed();
        this.body.linearVelocity = velocity;
    }
}