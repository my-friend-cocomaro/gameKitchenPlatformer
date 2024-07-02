import { _decorator, Component,Animation, EventKeyboard, input, Input, KeyCode, Node, Vec3 } from 'cc';
import { Player } from './Player';
import eventBus, { ItemEvents, PlayerAnim } from './constants';
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
    private animation: Animation;

    /**
     * Инициализация компонента. Настройка обработчиков событий.
     */
    onLoad() {
        console.log("Actions is inited");
        this.player = this.node.getComponent(Player);
        this.animation = this.node.getComponent(Animation);
        //
        this.animation.on(Animation.EventType.FINISHED, this.onAnimFinished, this);
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

    tmp_attack_finished: boolean = true;
    onAnimFinished(event: Animation.EventType, state: any) {
        if (state.name == PlayerAnim.attack) {
            this.tmp_attack_finished = true;
        } else {
            this.tmp_attack_finished = true; // костыль !!!ы
        }
    }

    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_F:
                if (this.player.items.length == 0) break;
                //
                this.player.putItem(
                    this.player.node.getPosition()
                );
                break;
            case KeyCode.SPACE:
                this.player.jump();
                break;
            case KeyCode.KEY_J:
                if (!this.tmp_attack_finished) break;
                //
                this.player.attack();
                this.tmp_attack_finished = false;
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


