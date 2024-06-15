import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 *  Добавляет объекту hitPoint-ы
 *  и функции взаимодействия с ними
 */
@ccclass('Damageble')
export class Damageble extends Component {
    @property(CCInteger)
    private hitPoints: number = 0;

    @property(CCInteger)
    private maxHitPoints: number = 0;

    // start() {
    // }

    get HitPoints() {
        return this.hitPoints;
    }

    takeDamage(hitPoints_count: number) {
        this.hitPoints -= hitPoints_count;
        if (this.hitPoints == 0) {
            // ?? событие смерти
        }
    }

    heal(hitPoints_count: number) {
        this.hitPoints += hitPoints_count;
        if(this.hitPoints > this.maxHitPoints){
            this.hitPoints = this.maxHitPoints;
        } 
    }

    // update(deltaTime: number) {
        
    // }
}


