import { _decorator, Component, Node, RigidBody2D, Vec2, Vec3, input, Input, EventKeyboard, KeyCode, Prefab, instantiate, log, Collider2D, Contact2DType, CCInteger } from 'cc';
import { Player } from './Player';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;


/**
 * Управляет движением игрока.
 * @class EnemyMovement
 */
@ccclass('EnemyMovement')
export class EnemyMovement extends Component {
    private body: RigidBody2D = null;
    private enemy: Enemy = null;

    /**
     * Инициализация компонента. Настройка обработчиков событий.
     */
    onLoad() {
        console.log("Movements is inited");
        //
        this.body = this.node.getComponent(RigidBody2D);
        this.enemy = this.node.getComponent(Enemy);
    }
   
    /**
     * Обновление состояния компонента.
     * @param {number} deltaTime - Время с последнего обновления.
     */
    update(deltaTime: number) {
        const velocity = this.body.linearVelocity;
        velocity.x = this.enemy.get_x_Direction() * this.enemy.get_Speed();
        this.body.linearVelocity = velocity;
    }
}