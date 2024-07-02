import { _decorator, Animation, Component, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import eventBus, { ItemEvents, TortleAnim, TortleEvents, TortleState } from './constants';
const { ccclass, property } = _decorator;

@ccclass('Tortle')
export class Tortle extends Component {
    private step: number = 8;
    private body: RigidBody2D;
    private direction: Vec2 = new Vec2(-1,0);
    // private item_Position: Vec3;
    private item_x_Position: number;
    private item_detection_x_distance: number = 500;
    private state: TortleState; 
    private itemNode: Node;
    //
    public tortleAnimations: Animation;

    onLoad() {
        this.body = this.node.getComponent(RigidBody2D);
        eventBus.on(ItemEvents.SPAWN, this.itemSpawned, this);
        this.tortleAnimations = this.node.getComponent(Animation);
        this.tortleAnimations.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);
    }

    onDestroy() {
       eventBus.off(ItemEvents.SPAWN, this.itemSpawned, this); 
    }
    
    // костыль для последовательных анимаций
    onAnimationFinished(event: Animation.EventType, state: any) {
        // console.log('Animation Finished');
        console.log(state.name);
        if (state.name == TortleAnim.appearance) {
            console.log('tortle is moving');
            this.tortleAnimations.play(TortleAnim.walk);
        }
        if (state.name == TortleAnim.eat_leaf) {
            setTimeout(() => {
                this.itemNode.active = false;
                this.itemNode.parent = null;
            }, 0.1);
            this.tortleAnimations.play(TortleAnim.dissapearance);
        }
    }

    itemSpawned(item_x_Position: number, itemNode: Node) {
        // console.log("item-x-Position: " + +item_x_Position);
        // console.log("tortle-x-Position: " + +this.node.position.x);
        if (this.check_x_DistanceBtWItemAndTortle(item_x_Position) && this.state != TortleState.MOVE) {
            console.log("check is turn on");
            this.setTortleState(TortleState.MOVE); 
            this.item_x_Position = item_x_Position;
            this.itemNode = itemNode;
        }
    }
    
    check_x_DistanceBtWItemAndTortle(item_x_Position: number) {
        return (
            item_x_Position > (this.node.position.x - this.item_detection_x_distance)
            && item_x_Position < this.node.position.x
        );
    }

    // setItemPosition(item_position: Vec3) {
    //     this.item_Position = item_position;
    // }

    // getstep() {
    //     return this.step;
    // }

    // set_x_Direction(x: number) {
    //     this.direction.x = x; }

    // get_x_Directon() {
    //     return this.direction.x;
    // }

    setTortleState(state: TortleState) {
        switch (state) {
            case TortleState.SLEEP:
                // this.set_x_LinearVelocity(this.step, 0);
                this.tortleAnimations.play(TortleAnim.eat_leaf);
                break;
            case TortleState.MOVE:
                // this.set_x_LinearVelocity(this.step, -1);
                this.tortleAnimations.play(TortleAnim.appearance); // 
                break;
            
        }
        // console.log("linear-X-Velociy: " + +this.body.linearVelocity.x);
        console.log(`Tortle ${state}`);
        this.state = state;
    }
        
    // set_x_LinearVelocity(step: number, direction_x: number) {
    //     let velocity = this.body.linearVelocity;
    //     velocity.x = step * direction_x;
    //     this.body.linearVelocity = velocity;
    // }

    // update(deltaTime: number) {
        
    // }

    ChangeTortleColliderPos() {
        console.log('tortle is appear');
    }

    TortleMove() {
        if (this.state != TortleState.MOVE) return;
        //
        console.log('tortle move');
        //
        let xPos = this.node.position.x + (this.step * this.direction.x);
        this.node.setPosition(xPos, this.node.position.y);
        //
        if (Math.abs(this.item_x_Position - xPos) < 49/2 + 8) {
            this.setTortleState(TortleState.SLEEP);
        }
    }


    // distance 49/2 + 8 

}


