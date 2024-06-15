import { _decorator, Component, EventKeyboard, input, Input, KeyCode, Node, Vec3 } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

/***
 * Управляет действиями игрока
 * @class PlayerActions
 */
@ccclass('PlayerActions')
export class PlayerActions extends Component {
    @property(Player)
    player: Player = null; 

    // private keyState: { [key: number]: boolean } = {}; // что это за объект?

    /**
     * Инициализация компонента. Настройка обработчиков событий.
     */
    onLoad() {
        console.log("Actions is inited");
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
        }
        // this.keyState[event.keyCode] = true;
    }    

    /**
     * Обработчик события отпускания клавиши.
     * @param {EventKeyboard} event - Событие клавиатуры.
     */
    onKeyUp(event: EventKeyboard) {
        // this.keyState[event.keyCode] = false;
    }

}


