export const WIDTH_GAME = 1000;

export const HEIGHT_GAME = 750;

export const GRAVITY = 500;

export const SPEED_PLAYER = 200;

export const SPEED_ENTITY = 30;

export const SPEED_UP_PLAYER = 2.2;

export const MASS_PLAYER = 10;

export const WIDTH_PLAYER = 180;

export const HEIGHT_PLAYER = 360;

export const SCALE_SIZE_PLAYER = 0.2;

export const SCALE_SIZE_WORLD = 1.2;

export const EMPTY_PICTURE_WIDTH = 300;

export const EMPTY_PICTURE_HEIGHT = 150;

export const enum ENEMY_TYPE {
  zombieGirl = 'zombieGirl',
  zombieMan = 'zombieMan',
}

export const enum PLAYER_TYPE {
  fox = 'fox',
  cat = 'cat',
}

export const enum ENTITY_ANIMATION {
  run = 'run',
  dead = 'dead',
  jump = 'jump',
  idle = 'idle',
  walk = 'walk',
}

export const enum IMAGES {
  bgLevel1 = 'bgGame',
  emptyPicture = 'emptyPicture',
  plate = 'plate',
}

export const MONEY = 'money';

export const MONEY_SCORE = 50;

export const COLLISION_PLAYER_ENEMY = 'collisionPlayerEnemy';

export const enum EMUSIC {
  soundBg = 'soundBg',
  jump = 'jump',
  coin = 'coin',
  dieEnemy = 'deadEnemy',
  diePlayer = 'diePlayer',
  win = 'win',
}
