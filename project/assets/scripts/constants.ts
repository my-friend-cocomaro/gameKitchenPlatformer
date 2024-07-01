import { EventTarget } from 'cc'

export enum CollisionGroup {
    WALL = 32,
    ENEMY = 4,
    ENEMY_OBJ = 8,
    ITEM = 16,
    BACKGROUND_ITEM = 64, // идея была в том что ели поставил объект то через него можно проходить и не подобрать но tortle видит
}

export enum TortleState {
    SLEEP = 'sleep',
    MOVE = 'move',
}

export enum TortleAnim {
    appearance = 'pan_tortle_appearance',
    dissapearance = 'pan_tortle_dissapearance',
    eat_leaf = 'pan_tortle_eat_leaf',
    walk = 'pan_tortle_walk'
}


export enum ItemEvents {
    SPAWN,
}

export enum TortleEvents {
    CHANGEPOS,
}

const eventBus = new EventTarget();
export default eventBus;