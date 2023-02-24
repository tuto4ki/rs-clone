import WebFontFile from '../assets/fonts/webFontFile';
import {
  ENEMY_TYPE,
  ENTITY_ANIMATION,
  IMAGES,
  MONEY,
  PLAYER_TYPE,
  EMUSIC,
  ESCENE,
  SOUND_BTNS,
  CAT_AVATAR,
  FOX_AVATAR,
  WIDTH_GAME,
  HEIGHT_GAME,
  EGAME_SETTINGS,
  EBUTTON,
  EGAME_MAP,
  END_MODAL,
  EN_logo,
  RU_logo,
  LV_logo,
} from '../game/constGame';

const COLOR_PRELOAD = 0x222222;
const COLOR_PROGRESS = 0xffffff;
const PROGRESS_BOX = { x: WIDTH_GAME / 2 - 160, y: HEIGHT_GAME / 2 - 25, width: 320, height: 50 };
const PROGRESS_BAR = { x: WIDTH_GAME / 2 - 150, y: HEIGHT_GAME / 2 - 15, width: 300, height: 30 };

export default class PreloadScene extends Phaser.Scene {
  selectedCharacter: unknown;
  textBtn: Phaser.GameObjects.Text | undefined;

  constructor() {
    super(ESCENE.preload);
  }

  public preload(): void {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(COLOR_PRELOAD, 0.8);
    progressBox.fillRect(PROGRESS_BOX.x, PROGRESS_BOX.y, PROGRESS_BOX.width, PROGRESS_BOX.height);
    this.load.on('progress', function (value: number) {
      progressBar.clear();
      progressBar.fillStyle(COLOR_PROGRESS, 1);
      progressBar.fillRect(PROGRESS_BAR.x, PROGRESS_BAR.y, PROGRESS_BAR.width * value, PROGRESS_BAR.height);
    });
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      this.scene.start(ESCENE.start);
    });
    this.load.image(IMAGES.emptyPicture, '../assets/images/empty.png');
    this.load.atlas(PLAYER_TYPE.fox, '../assets/sprites/fox.png', '../assets/json/fox.json');
    this.load.atlas(PLAYER_TYPE.cat, '../assets/sprites/cat.png', '../assets/json/cat.json');
    this.load.atlas(ENEMY_TYPE.zombieGirl, '../assets/sprites/zombieGirl.png', '../assets/json/zombieGirl.json');
    this.load.atlas(ENEMY_TYPE.zombieMan, '../assets/sprites/zombieMan.png', '../assets/json/zombieMan.json');
    this.load.atlas(ENEMY_TYPE.wraith, '../assets/sprites/wraith.png', '../assets/json/wraith.json');
    this.load.image(IMAGES.plate, '../assets/images/plateEndGame.png');
    this.load.atlas(MONEY, '../assets/sprites/money.png', '../assets/json/money.json');
    // load level
    this.loadLevel(EGAME_SETTINGS.maxLevel);
    // load pre scene
    this.load.tilemapTiledJSON(`${EGAME_MAP.levelMap}1-2`, `../assets/json/level1-2.json`);
    this.load.image(`${IMAGES.tunnel}1`, '../assets/images/levelTunnel1.png');
    this.load.image(`${IMAGES.tunnel}2`, '../assets/images/levelTunnel2.png');
    // load music
    this.load.audio(EMUSIC.soundBg, '../assets/sound/soundBg.mp3');
    this.load.audio(EMUSIC.jump, '../assets/sound/soundJump.ogg');
    this.load.audio(EMUSIC.coin, '../assets/sound/soundCoin.ogg');
    this.load.audio(EMUSIC.dieEnemy, '../assets/sound/soundDieEnemy.ogg');
    this.load.audio(EMUSIC.diePlayer, '../assets/sound/soundDiePlayer.ogg');
    this.load.audio(EMUSIC.win, '../assets/sound/soundWin.mp3');
    // load button
    this.load.image(EBUTTON.nextLevel, '../assets/sprites/buttons/backBtn.svg');
    this.load.image(EBUTTON.gear, '../assets/sprites/gear.png');
    this.load.image(EBUTTON.help, '../assets/sprites/buttons/helpBtn.svg');
    this.load.image(EBUTTON.play, '../assets/sprites/buttons/playBtn.svg');
    this.load.image('exitBtn', '../assets/sprites/buttons/exitBtn.svg');
    this.load.image(END_MODAL.homeBtn, '../assets/sprites/buttons/homeBtn.svg');
    this.load.image('infoBtn', '../assets/sprites/buttons/infoBtn.svg');
    this.load.image('menuBtn', '../assets/sprites/buttons/menuBtn.svg');
    this.load.image(END_MODAL.reloadBtn, '../assets/sprites/buttons/reloadBtn.svg');
    this.load.image(SOUND_BTNS.musicOnBtn, '../assets/sprites/buttons/musicOn.svg');
    this.load.image(SOUND_BTNS.musicOffBtn, '../assets/sprites/buttons/musicOff.svg');
    this.load.image(SOUND_BTNS.soundOnBtn, '../assets/sprites/buttons/soundOn.svg');
    this.load.image(SOUND_BTNS.soundOffBtn, '../assets/sprites/buttons/soundOff.svg');
    this.load.image('leaderBoardBtn', '../assets/sprites/buttons/leaderboardBtn.svg');
    this.load.image(EBUTTON.close, '../assets/sprites/buttons/closeBtn.svg');
    this.load.image(EBUTTON.howPlay, '../assets/sprites/howToPlay.png');
    this.load.image(END_MODAL.gravestone, '../assets/sprites/gravestone.svg');
    this.load.image(END_MODAL.winCup, '../assets/images/win.png');
    this.load.image(EN_logo, '../assets/images/en.png');
    this.load.image(RU_logo, '../assets/images/ru.png');
    this.load.image(LV_logo, '../assets/images/lv.png');
    this.load.image(CAT_AVATAR, '../assets/sprites/catAvatar.png');
    this.load.image(FOX_AVATAR, '../assets/sprites/foxAvatar.png');
    const fonts = new WebFontFile(this.load, 'Itim');
    this.load.addFile(fonts);
  }

  public create(): void {
    this.createAnimationPlayer(PLAYER_TYPE.fox);
    this.createAnimationPlayer(PLAYER_TYPE.cat);
    this.createAnimationZombie(ENEMY_TYPE.zombieGirl);
    this.createAnimationZombie(ENEMY_TYPE.zombieMan);
    this.createAnimationWraith(ENEMY_TYPE.wraith);
    this.createAnimationMoney();
  }
  private createAnimationPlayer(type: string): void {
    this.addAnimationToManager(`${ENTITY_ANIMATION.run}${type}`, type, 'Run_', 1, 8, 2, 15, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.jump}${type}`, type, 'Jump_', 1, 8, 2, 15, 0);
    this.addAnimationToManager(`${ENTITY_ANIMATION.idle}${type}`, type, 'Idle_', 1, 10, 2, 15, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.dead}${type}`, type, 'Dead_', 1, 10, 2, 15, 0);
  }

  private createAnimationZombie(type: string): void {
    this.addAnimationToManager(`${ENTITY_ANIMATION.walk}${type}`, type, 'Walk_', 1, 6, 2, 10, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.dead}${type}`, type, 'Dead_', 1, 8, 2, 10, 0);
    this.addAnimationToManager(`${ENTITY_ANIMATION.run}${type}`, type, 'Run_', 3, 10, 2, 15, -1);
  }

  private createAnimationWraith(type: string): void {
    this.addAnimationToManager(`${ENTITY_ANIMATION.walk}${type}`, type, 'Walk_', 0, 11, 2, 10, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.dead}${type}`, type, 'Dead_', 0, 14, 2, 10, 0);
  }

  private createAnimationMoney(): void {
    this.addAnimationToManager(MONEY, MONEY, 'gold_', 1, 10, 2, 10, -1);
  }

  private addAnimationToManager(
    key: string,
    type: string,
    prefix: string,
    start: number,
    end: number,
    zeroPad: number,
    frameRate: number,
    repeat: number
  ): void {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNames(type, { prefix: prefix, start: start, end: end, zeroPad: zeroPad }),
      frameRate: frameRate,
      repeat: repeat,
    });
  }

  loadLevel(numLevel: number): void {
    for (let i = 1; i <= numLevel; i++) {
      this.load.image(`${EGAME_MAP.levelTiles}${i}`, `../assets/sprites/level${i}.png`);
      this.load.tilemapTiledJSON(`${EGAME_MAP.levelMap}${i}`, `../assets/json/level${i}.json`);
      this.load.image(`${IMAGES.bgLevel}${i}`, `../assets/images/bgLevel${i}.png`);
      this.load.image(`${IMAGES.bgLevel}${i}svg`, `../assets/images/bgLevel${i}.svg`);
    }
  }
}
