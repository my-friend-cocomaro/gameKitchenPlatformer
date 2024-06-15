
export enum CollisionGroup {
    WALL = 32,
    ENEMY = 4,
    ENEMY_OBJ = 8,
    ITEM = 16,
    BACKGROUND_ITEM = 64, // идея была в том что ели поставил объект то через него можно проходить и не подобрать но tortle видит
}