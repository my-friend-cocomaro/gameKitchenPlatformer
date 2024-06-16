import { _decorator, Component, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
import eventBus, { ItemEvents, TortleState } from './constants';
const { ccclass, property } = _decorator;

@ccclass('Tortle')
export class Tortle extends Component {
    private speed: number = 5;
    private body: RigidBody2D;
    private direction: Vec2;
    private item_Position: Vec3;
    private item_detection_x_distance: number = 500;

    onLoad() {
        this.body = this.node.getComponent(RigidBody2D);
        eventBus.on(ItemEvents.SPAWN, this.itemSpawned, this);
    }

    onDestroy() {
       eventBus.off(ItemEvents.SPAWN, this.itemSpawned, this); 
    }

    itemSpawned(item_x_Position: number) {
        // console.log("item-x-Position: " + +item_x_Position);
        // console.log("tortle-x-Position: " + +this.node.position.x);
        if (this.check_x_DistanceBtWItemAndTortle(item_x_Position)) {
            console.log("check is turn on");
            this.setTortleState(TortleState.MOVE); 
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

    // getSpeed() {
    //     return this.speed;
    // }

    // set_x_Direction(x: number) {
    //     this.direction.x = x; }

    // get_x_Directon() {
    //     return this.direction.x;
    // }

    setTortleState(state: TortleState) {
        switch (state) {
            case TortleState.SLEEP:
                this.set_x_LinearVelocity(this.speed, 0);
                break;
            case TortleState.MOVE:
                this.set_x_LinearVelocity(this.speed, -1);
                break;
        }
        // console.log("linear-X-Velociy: " + +this.body.linearVelocity.x);
        console.log(`Tortle ${state}`);
    }
        
    set_x_LinearVelocity(speed: number, direction_x: number) {
        let velocity = this.body.linearVelocity;
        velocity.x = speed * direction_x;
        this.body.linearVelocity = velocity;
    }

    // update(deltaTime: number) {
        
    // }

}


