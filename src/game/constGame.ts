export const enum EGAME_SETTINGS {
  maxLevel = 2,
  width = 1000,
  height = 750,
}

export const enum ELANG {
  ru = 'ru',
  en = 'en',
  lv = 'lv',
}

export const GRAVITY = 500;

export const GAME_BACKGROUND = '#2e2b2b';

export const SPEED_PLAYER = 200;

export const SPEED_ENTITY = 30;

export const SPEED_UP_PLAYER = 2.2;

export const MASS_PLAYER = 10;

export const WIDTH_PLAYER = 180;

export const HEIGHT_PLAYER = 360;

export const SCALE_SIZE_PLAYER = 0.18;

export const SCALE_SIZE_WORLD = 1;

export const EMPTY_PICTURE = 64;

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
  width = 64,
  height = 64,
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
  tunnel = 'tunnel',
  money = 'money',
}

// export const MONEY = ;

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

export const enum ESCENE {
  preload = 'Preload',
  start = 'Start',
  game = 'Game',
  settings = 'SettingsScene',
  help = 'HelpScene',
  end = 'EndGameScene',
  tunnel = 'TunnelScene',
  popup = 'Popup',
}

export const enum EBUTTON {
  nextLevel = 'nextLevel',
  gear = 'GEAR_BTN',
  help = 'HELP_BTN',
  play = 'PLAY_BTN',
  close = 'CLOSE_BTN',
  howPlay = 'HOW_TO_PLAY',
  leaderboard = 'LEADER_BOARD_BTN',
  langEn = 'enButton',
  langRu = 'ruButton',
  langLv = 'lvButton',
}

export const CAT_AVATAR = 'catAvatar';
export const FOX_AVATAR = 'foxAvatar';
export const EN_logo = 'EN';
export const RU_logo = 'RU';
export const LV_logo = 'LV';

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
