import { _decorator, Component, EventKeyboard, input, Input, KeyCode, Node, Vec3 } from 'cc';
import { Player } from './Player';
import eventBus, { ItemEvents } from './constants';
const { ccclass, property } = _decorator;

/***
 * Управляет действиями игрока
 * @class PlayerHandingKeyboardEvents
 */
@ccclass('PlayerHandingKeyboardEvents')
export class PlayerHandingKeyboardEvents extends Component {
    // @property(Player)
    private player: Player = null;  
    private keyState: { [key: number]: boolean } = {};

    /**
     * Инициализация компонента. Настройка обработчиков событий.
     */
    onLoad() {
        console.log("Actions is inited");
        this.player = this.node.getComponent(Player);
        //
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


    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_F:
                this.player.putItem(
                    this.player.node.getPosition()
                );
                break;
            case KeyCode.SPACE:
                this.player.jump();
                break;
        }
        //  
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
     * Обновление направления движения игрока, мультитачинг
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


