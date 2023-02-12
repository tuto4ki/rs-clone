export const WIDTH_GAME = 1000;

export const HEIGHT_GAME = 750;

export const GRAVITY = 500;

export const SPEED_PLAYER = 200;

export const SPEED_ENTITY = 30;

export const SPEED_UP_PLAYER = 2.2;

export const MASS_PLAYER = 10;

export const WIDTH_PLAYER = 80;

export const HEIGHT_PLAYER = 330;

export const SCALE_SIZE_PLAYER = 0.2;

export const SCALE_SIZE_WORLD = 1.2;

export const EMPTY_PICTURE_WIDTH = 300;

export const EMPTY_PICTURE_HEIGHT = 150;

export const enum PLAYER_TYPE {
  FOX = 'fox',
  CAT = 'cat',
}

export const PLAYER_ANIMATION = {
  [PLAYER_TYPE.FOX]: {
    run: 'run',
    dead: 'dead',
    jump: 'jump',
    stay: 'stay',
  },
};

export const MONEY = 'money';

export const COLLISION_PLAYER_ENEMY = 'collisionPlayerEnemy';
