import { _decorator, Component, Node, RigidBody2D, Animation } from 'cc';
import { Damageble } from './Damageble';
import { EnemyAnim, EnemyEvents, EnemyState } from './constants';
import { Player } from './Player';
import { PlayerMovement } from './PlayerMovement';
import { PlayerHandingKeyboardEvents } from './PlayerHandingKeyboardEvents';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    private damageble: Damageble;
    private player: Node;
    private received_dmg: number = 1;
    private state: EnemyState;
    private sleepDistance: number = 200;
    private weaponDistance: number = 20;
    private speed: number = 2;
    private body: RigidBody2D;
    public x_direction: number = 0;
    private animations: Animation;
    //

    onLoad() {
        this.player = this.node.parent.getChildByName("Player");
        this.damageble = this.node.getComponent(Damageble);
        this.state = EnemyState.sleep;
        this.body = this.node.getComponent(RigidBody2D);
        this.animations = this.node.getComponent(Animation);
    }

    onDestroy() {        
    }

    enemySetState(state: EnemyState) {
        switch(state) {
            case EnemyState.sleep:
                break;
            case EnemyState.move: 
                this.animations.play(EnemyAnim.run);
                break;
        }
        this.state = state;
    }

    checkDistanceBTW_player_and_enemy(distance: number): [boolean, number] {
        let diff = this.node.position.x - this.player.position.x;
        console.log(`${Math.abs(diff)}`);
        return [(Math.abs(diff) <= distance), Math.sign(diff)];
    }

    //
    get_x_Direction() {
        return this.x_direction;
    }

    get_Speed() {
        return this.speed;
    }
    //

    enemyKnifeHit() { // ударяет игрока ести он находится в радиусе поражения
        this.player.getComponent(Player).takeDamage(this.received_dmg);
    }
   
    takeDamage(hitCounts: number) {
        let isDead = this.damageble.takeDamage(hitCounts);
        if (isDead) {
            setTimeout(() => { 
                this.node.getComponent(Enemy).destroy();
            }
            , 0.2);  
            this.animations.play(EnemyAnim.die);
            console.log("enemy died");
        } else {
            this.animations.play(EnemyAnim.damage);
            console.log('enemy damage');
        }
    }    

    update(deltaTime: number) { // пассивная проверка дистанции
        if (this.state == EnemyState.sleep) {
            let inRangeAndDirect = this.checkDistanceBTW_player_and_enemy(this.sleepDistance);
            if (inRangeAndDirect[0]) { 
                this.x_direction = -1*inRangeAndDirect[1];
                this.enemySetState(EnemyState.move);
                //
                console.log(this.x_direction);
            }
        } else {
            if (this.checkDistanceBTW_player_and_enemy(this.weaponDistance + 20)[0]){
                this.animations.play(EnemyAnim.attack);
                this.x_direction = 0;
            }
        }
    }
}


