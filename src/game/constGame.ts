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

export const serverAdress = 'http://localhost:3000';

export const responseStatus = {
  error: 500,
  created: 201,
  ok: 200,
  notFound: 404,
};

export const enum ESCENE {
  start = 'Start',
  game = 'Game',
  settings = 'SettingsScene',
  help = 'HelpScene',
  end = 'EndGameScene',
}

export const GEAR_BTN = 'GEAR_BTN';
export const HELP_BTN = 'HELP_BTN';
export const PLAY_BTN = 'PLAY_BTN';
export const CLOSE_BTN = 'CLOSE_BTN';
export const HOW_TO_PLAY = 'HOW_TO_PLAY';
export const CAT_AVATAR = 'catAvatar';
export const FOX_AVATAR = 'foxAvatar';

export const enum END_MODAL {
  homeBtn = 'homeBtn',
  reloadBtn = 'reloadBtn',
  gravestone = 'gravestone',
  winCup = 'winCup',
}
export const enum SOUND_BTNS {
  musicOnBtn = 'musicOnBtn',
  musicOffBtn = 'musicOffBtn',
  soundOnBtn = 'soundOnBtn',
  soundOffBtn = 'soundOffBtn',
}
