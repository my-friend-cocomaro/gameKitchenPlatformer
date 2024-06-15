import { _decorator, Component, Node, RigidBody2D, Vec2, Vec3, input, Input, EventKeyboard, KeyCode, Prefab, instantiate, log, Collider2D, Contact2DType, CCInteger } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;


/**
 * Управляет движением игрока.
 * @class PlayerMovement
 */
@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    @property(Player)
    player: Player;   

    private keyState: { [key: number]: boolean } = {}; // что это за объект?

    /**
     * Инициализация компонента. Настройка обработчиков событий.
     */
    onLoad() {
        console.log("Movements is inited");

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }


    /**
     * Очистка обработчиков событий при уничтожении компонента.
     */
    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }


    /**
     * Обработчик события нажатия клавиши.
     * @param {EventKeyboard} event - Событие клавиатуры.
     */
    onKeyDown(event: EventKeyboard) {
        if(event.keyCode == KeyCode.SPACE
           && this.player.getGrounded()) {
            this.player.jump();
        }

        this.keyState[event.keyCode] = true;
        this.updateDirection();
    }
    

    /**
     * Обработчик события отпускания клавиши.
     * @param {EventKeyboard} event - Событие клавиатуры.
     */
    onKeyUp(event: EventKeyboard) {
        this.keyState[event.keyCode] = false;
        this.updateDirection();
    }


    /**
     * Обновление направления движения игрока. Есть мультитачинг
     */
    updateDirection() {
        if (this.keyState[KeyCode.KEY_A] && this.keyState[KeyCode.KEY_D]) {
            this.player.set_x_Direction(0);
        } else if (this.keyState[KeyCode.KEY_A]) {
            this.player.set_x_Direction(-1);
        } else if (this.keyState[KeyCode.KEY_D]) {
            this.player.set_x_Direction(1);
        } else {
            this.player.set_x_Direction(0);
        }
    }
}