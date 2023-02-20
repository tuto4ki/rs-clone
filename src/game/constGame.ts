export const enum EGAME_SETTINGS {
  maxLevel = 2,
  width = 1000,
  height = 750,
}

export const WIDTH_GAME = 1000;

export const HEIGHT_GAME = 750;

export const GRAVITY = 500;

export const GAME_BACKGROUND = '#2e2b2b';

export const SPEED_PLAYER = 200;

export const SPEED_ENTITY = 30;

export const SPEED_UP_PLAYER = 2.2;

export const MASS_PLAYER = 10;

export const WIDTH_PLAYER = 180;

export const HEIGHT_PLAYER = 360;

export const SCALE_SIZE_PLAYER = 0.2;

export const SCALE_SIZE_WORLD = 1;

export const EMPTY_PICTURE_WIDTH = 300;

export const EMPTY_PICTURE_HEIGHT = 150;

export const enum ENEMY_TYPE {
  zombieGirl = 'zombieGirl',
  zombieMan = 'zombieMan',
  wraith = 'wraith',
}

export const enum EGAME_MAP {
  levelMap = 'levelMap',
  levelTiles = 'levelTiles',
  waterObj = 'waterObj',
  stumpObj = 'stumpObj',
  endGame = 'endGame',
  ground = 'ground',
  background = 'background',
  water = 'water',
  entityObj = 'entityObj',
  level = 'level',
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
  bgLevel = 'bgLevel',
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
  preload = 'Preload',
  start = 'Start',
  game = 'Game',
  settings = 'SettingsScene',
  help = 'HelpScene',
  end = 'EndGameScene',
}

export const enum EBUTTON {
  nextLevel = 'nextLevel',
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

export const TITLE_STYLE = {
  fontFamily: 'Itim',
  fontSize: '30px',
  color: '#F5F901',
  stroke: '#E52121',
  strokeThickness: 6,
  shadow: { color: '#010101', fill: true, blur: 4, offsetX: 6, offsetY: 0 },
};

export const MODAL_TEXT_STYLE = {
  fontFamily: 'Itim',
  fontSize: '22px',
  color: '#fff',
  stroke: '#C83737',
  strokeThickness: 2,
};

export const MODAL_TEXT_STYLE_000 = {
  fontFamily: 'Itim',
  fontSize: '24px',
  color: '#000',
  stroke: '#600808',
  strokeThickness: 1,
};

export const STATISTICS_TEXT_STYLE = {
  fontFamily: 'Itim',
  fontSize: '30px',
  color: '#F5F901',
  stroke: '#E52121',
  strokeThickness: 6,
};
