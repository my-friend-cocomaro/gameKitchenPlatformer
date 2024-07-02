import { _decorator, Component, Node } from 'cc';
import { Damageble } from './Damageble';
import eventBus, { PlayerEvents } from './constants';
const { ccclass, property } = _decorator;

@ccclass('IconsController')
export class IconsController extends Component {
    playerDamageble: Damageble;
    icons: Node[];
    //

    onLoad() {
        this.icons = this.node.children; // Node[]
        eventBus.on(PlayerEvents.takeDamage, this.takeDamage, this);
    }

    onDestroy() {
        //        
    }

    takeDamage(hitNumber: number) {
        for (let i: number = 0; i < hitNumber; i++) {
            let heartNode = this.icons.pop();
            heartNode.active = false;
        }
    }

    // update(dt) {
    //     ;
    // }
}


