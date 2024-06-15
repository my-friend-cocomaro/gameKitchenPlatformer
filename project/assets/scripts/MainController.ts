import { EPhysics2DDrawFlags, PhysicsSystem2D, _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainController')
export class MainController extends Component {
    // @property(Node)
    // player = null;
    
    start() {
        PhysicsSystem2D.instance.enable = true;

        // Включение отладки физики для 2D
        PhysicsSystem2D.instance.debugDrawFlags = 
            EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Shape; 

        // this.player.getComponent('Player').start();
    }

    update(deltaTime: number) {
        
    }
}


