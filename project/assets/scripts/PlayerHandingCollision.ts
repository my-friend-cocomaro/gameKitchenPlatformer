import { _decorator,Animation, Collider2D, Component, Contact2DType, Node } from 'cc';
import { Player } from './Player';
import { CollisionGroup, PlayerAnim } from './constants';
import { PlayerHandingKeyboardEvents } from './PlayerHandingKeyboardEvents';
import { PlayerMovement } from './PlayerMovement';
const { ccclass, property } = _decorator;

@ccclass('PlayerHandingCollistion')
export class PlayerHandingCollistion extends Component {
    private player: Player;
    private _collider: Collider2D;
    private animation: Animation;

    onLoad() { 
        console.log("HandingCollistion is inited");
        //
        this.player = this.node.getComponent(Player);
        this.animation = this.node.getComponent(Animation);
        this._collider = this.node.getComponent(Collider2D);
        //
        this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this._collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        //
        // this.animation.on(Animation.EventType.FINISHED, this.sni);
    }

    onDestroy() {
        this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this._collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        //
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        switch(otherCollider.group) {
            case CollisionGroup.WALL:
                this.player.setGrounded(true);
                break;
            case CollisionGroup.ITEM:
                this.player.takeItem(otherCollider.node);
                //
                break;
            case CollisionGroup.ENEMY_OBJ:
                setTimeout(() => { 
                    let plHand = this.player.getComponent(PlayerHandingKeyboardEvents);
                    let plMove = this.player.getComponent(PlayerMovement);
                    plHand.destroy();
                    plMove.destroy();
                }
                , 0.1);
                
                // console.log("Player is dead");
                this.player.playAnim(PlayerAnim.die);
        }
        // console.log(otherCollider.group);
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        if (otherCollider.group == CollisionGroup.WALL){
            this.player.setGrounded(false);
        }
    }
}

/*
tasks:
    поставить линтер 
*/
