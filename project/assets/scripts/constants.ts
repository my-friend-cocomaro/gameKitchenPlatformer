import { EventTarget } from 'cc'

export enum CollisionGroup {
    WALL = 32,
    ENEMY = 4,
    ENEMY_OBJ = 8,
    ITEM = 16,
    BACKGROUND_ITEM = 64, // идея была в том что ели поставил объект то через него можно проходить и не подобрать но tortle видит
}

export enum GameState {
    Init,
    Play,
}


export enum TortleState {
    SLEEP = 'sleep',
    MOVE = 'move',
}

export enum EnemyState {
    sleep = 'sleep',
    move = 'move', // notice player
}

export enum TortleAnim {
    appearance = 'pan_tortle_appearance',
    dissapearance = 'pan_tortle_dissapearance',
    eat_leaf = 'pan_tortle_eat_leaf',
    walk = 'pan_tortle_walk'
}

export enum PlayerAnim {
    die = 'player_die',
    attack = 'player_attack',
    idle = 'player_idle',
    jump = 'player_jump',
    run = 'player_run',
    take = 'player_take',
    put = 'player_put',
    damage = 'player_damage',
}

export enum EnemyAnim {
    die = 'enemy_damage',
    attack = 'enemy_run',
    run = 'enemy_attack',
    damage = 'enemy_die',
}

export enum ItemEvents {
    SPAWN,
}

export enum TortleEvents {
    CHANGEPOS,
}

export enum EnemyEvents {
    hit = 'enemyHit',
}

export enum PlayerEvents {
    dead = 'playerDead',
    updatePosition = 'updatePosition',
    takeDamage = 'takeDamage',
}

const eventBus = new EventTarget();
export default eventBus;