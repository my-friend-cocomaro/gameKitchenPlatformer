import { _decorator, Collider2D, Component, Contact2DType, Node, RigidBody2D } from 'cc';
import { CollisionGroup, TortleAnim, TortleEvents, TortleState } from './constants';
import { Tortle } from './Tortle';
import eventBus from './constants';
const { ccclass, property } = _decorator;

@ccclass('TortleHandingSensor')
export class TortleHandingSensor extends Component {
    private tortle_collider: Collider2D;
    private tortle: Tortle;

    onLoad() {
        // this.tortle_collider = this.node.getComponent(Collider2D);
        this.tortle = this.node.getComponent(Tortle);
        eventBus.on(TortleEvents.CHANGEPOS, this.handingItem);
        //
        
        // this.tortle_collider.on(Contact2DType.BEGIN_CONTACT, this.tortleOnBeginContact, this);
        // this.tortle_collider.on(Contact2DType.END_CONTACT, this.tortleEndContact, this); 
    }

    onDestroy() {
        eventBus.off(TortleEvents.CHANGEPOS, this.handingItem);
        //
        // this.tortle_collider.off(Contact2DType.BEGIN_CONTACT, this.tortleOnBeginContact, this);
        // this.tortle_collider.off(Contact2DType.END_CONTACT, this.tortleEndContact, this); 
    }

    handingItem(tortle_x_Pos: number) {
                
    }
    


    // tortleOnBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    //     if(otherCollider.group == CollisionGroup.ITEM){
    //         console.log('Tortle eat a leaf');
    //         //
    //         this.tortle.tortleAnimations.play(TortleAnim.eat_leaf);
    //         // 
    //         setTimeout(() => otherCollider.node.destroy(), 0.1);
    //         this.tortle.setTortleState(TortleState.SLEEP);
    //     }
    // }

    // tortleEndContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    
    // }


    // update(deltaTime: number) {
        
    // }
}


