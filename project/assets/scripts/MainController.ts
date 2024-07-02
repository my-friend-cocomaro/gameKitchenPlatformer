import { EPhysics2DDrawFlags, PhysicsSystem2D, _decorator, Component, Node } from 'cc';
import { Player } from './Player';
import eventBus, { GameState, PlayerEvents } from './constants';
const { ccclass, property } = _decorator;

@ccclass('MainController')
export class MainController extends Component {
    // @property(Node)
    // player = null;
   
    start() {
        // PhysicsSystem2D.instance.enable = true;

        // // Включение отладки физики для 2D
        // PhysicsSystem2D.instance.debugDrawFlags = 
        //     EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Shape; 
        // this.node.getChildByPath('Player/Icons/Leaf Icon').active = false;
        // this.player.getComponent('Player').start();
    }

    onLoad() {
        eventBus.on(PlayerEvents.dead, this.ifThePlayerIsDead, this);
    }

    onDestroy() {
        eventBus.off(PlayerEvents.dead, this.ifThePlayerIsDead, this); 
    }
    //

    ifThePlayerIsDead() {
        this.setGameState(GameState.Init);
    }

    //
    setGameState(state: GameState) {
        switch(state) {
            case GameState.Init:
                this.node.getChildByPath('Player').active = false;
                this.node.getChildByName('game').active = false;
                this.node.getChildByName('mainMenu').active = true;
                break;
            case GameState.Play:
                this.node.getChildByPath('Player').active = true;
                this.node.getChildByName('mainMenu').active = false;
                this.node.getChildByName('game').active = true;
                break;
        }
        //
    }

    playButtonClicked() {
        this.setGameState(GameState.Play);
    }

    update(deltaTime: number) {
    }
}


