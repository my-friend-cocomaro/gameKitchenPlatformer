import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 *  Добавляет объекту hitPoint-ы
 *  и функции взаимодействия с ними
 */
@ccclass('Damageble')
export class Damageble extends Component {
    private hitPoints: number;

    @property(CCInteger)
    private maxHitPoints: number = 0;

    // start() {
    // }
    onLoad() {
        this.hitPoints = this.maxHitPoints;
    }

    get HitPoints() {
        return this.hitPoints;
    }

    /** 
     * change hit points counter
     * @param hitPoints_count - number of received damage
     * @returns isDead boolean value 
     */

    takeDamage(hitPoints_count: number) {
        this.hitPoints -= hitPoints_count;
        console.log(this.hitPoints);
        if (this.hitPoints == 0) {
            // ?? событие смерт
            return true
        }
        return false
    }

    //
    // heal(hitPoints_count: number) {
    //     this.hitPoints += hitPoints_count;
    //     if(this.hitPoints > this.maxHitPoints){
    //         this.hitPoints = this.maxHitPoints;
    //     } 
    // }
    //
    
    // update(deltaTime: number) {
        
    // }
}


