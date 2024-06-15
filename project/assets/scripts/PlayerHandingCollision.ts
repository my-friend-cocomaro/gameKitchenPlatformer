import { _decorator, Collider2D, Component, Contact2DType, Node } from 'cc';
import { Player } from './Player';
import { CollisionGroup } from './constants';
const { ccclass, property } = _decorator;

@ccclass('PlayerHandingCollistion')
export class PlayerHandingCollistion extends Component {
    @property(Player)
    player: Player;

    private _collider: Collider2D;

    onLoad() { 
        console.log("HandingCollistion is inited");

        this._collider = this.player.collider;
        //
        this._collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this._collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    onDestroy() {
        this._collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this._collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
        
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        switch(otherCollider.group) {
            case CollisionGroup.WALL:
                this.player.setGrounded(true);
                break;
            case CollisionGroup.ITEM:
                this.player.takeItem(otherCollider.node);
                break;
        }
        console.log(otherCollider.group);
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
