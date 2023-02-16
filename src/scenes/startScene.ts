import WebFontFile from '../assets/fonts/webFontFile';
import {
  ENEMY_TYPE,
  ENTITY_ANIMATION,
  IMAGES,
  MONEY,
  PLAYER_TYPE,
  HEIGHT_GAME,
  WIDTH_GAME,
  EMUSIC,
  ESCENE,
  GEAR_BTN,
  HELP_BTN,
  PLAY_BTN,
  END_MODAL,
  CLOSE_BTN,
  HOW_TO_PLAY,
  SOUND_BTNS,
  CAT_AVATAR,
  FOX_AVATAR,
  TITLE_STYLE,
  MODAL_TEXT_STYLE,
} from '../game/constGame';

export default class StartScene extends Phaser.Scene {
  selectedCharacter: unknown;
  textBtn: Phaser.GameObjects.Text | undefined;
  constructor() {
    super(ESCENE.start);
  }
  public preload(): void {
    this.load.image(IMAGES.bgLevel1, '../assets/images/bg.png');
    this.load.image(IMAGES.emptyPicture, '../assets/images/empty.png');
    this.load.atlas(PLAYER_TYPE.fox, '../assets/sprites/fox.png', '../assets/json/fox.json');
    this.load.atlas(ENEMY_TYPE.zombieGirl, '../assets/sprites/zombieGirl.png', '../assets/json/zombieGirl.json');
    this.load.atlas(ENEMY_TYPE.zombieMan, '../assets/sprites/zombieMan.png', '../assets/json/zombieMan.json');
    this.load.image(IMAGES.plate, '../assets/images/plateEndGame.png');
    this.load.atlas(MONEY, '../assets/sprites/money.png', '../assets/json/money.json');
    // load level 1
    this.load.image('tiles', '../assets/sprites/freeTiles.png');
    this.load.tilemapTiledJSON('map', '../assets/json/level1.json');
    this.load.audio(EMUSIC.soundBg, '../assets/sound/soundBg.mp3');
    this.load.audio(EMUSIC.jump, '../assets/sound/soundJump.ogg');
    this.load.audio(EMUSIC.coin, '../assets/sound/soundCoin.ogg');
    this.load.audio(EMUSIC.dieEnemy, '../assets/sound/soundDieEnemy.ogg');
    this.load.audio(EMUSIC.diePlayer, '../assets/sound/soundDiePlayer.ogg');
    this.load.audio(EMUSIC.win, '../assets/sound/soundWin.mp3');
    this.load.image(GEAR_BTN, '../assets/sprites/gear.png');
    this.load.image(HELP_BTN, '../assets/sprites/buttons/helpBtn.svg');
    this.load.image(PLAY_BTN, '../assets/sprites/buttons/playBtn.svg');
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
    this.load.image(CLOSE_BTN, '../assets/sprites/buttons/closeBtn.svg');
    this.load.image(HOW_TO_PLAY, '../assets/sprites/howToPlay.png');
    this.load.image(END_MODAL.gravestone, '../assets/sprites/gravestone.svg');
    this.load.image(END_MODAL.winCup, '../assets/images/win.png');
    this.load.image(CAT_AVATAR, '../assets/sprites/catAvatar.png');
    this.load.image(FOX_AVATAR, '../assets/sprites/foxAvatar.png');
    const fonts = new WebFontFile(this.load, 'Itim');
    this.load.addFile(fonts);
  }
  public create(): void {
    this.createAnimationPlayer(PLAYER_TYPE.fox);
    this.createAnimationZombie(ENEMY_TYPE.zombieGirl);
    this.createAnimationZombie(ENEMY_TYPE.zombieMan);
    this.createAnimationMoney();

    const choose_title = this.add.text(WIDTH_GAME / 2, 30, 'Choose Your Character ', TITLE_STYLE).setOrigin(0.5, 0.5);
    choose_title.name = 'title';

    const player_1 = this.add
      .image(WIDTH_GAME / 2 - 100, HEIGHT_GAME / 2 - 200, CAT_AVATAR)
      .setInteractive({ useHandCursor: true })
      .setScale(0.2);
    const player_2 = this.add
      .image(WIDTH_GAME / 2 + 100, HEIGHT_GAME / 2 - 200, FOX_AVATAR)
      .setInteractive({ useHandCursor: true })
      .setScale(0.2);
    player_1.name = 'catAvatar';
    player_2.name = 'foxAvatar';
    player_1.setTint(0xa79999);
    player_2.setTint(0xa79999);

    let SELECTED_CHARACTER: Phaser.GameObjects.Image | null = null;

    player_1.on('pointerdown', () => {
      console.log('cat');
      SELECTED_CHARACTER = player_1;
      player_1.setTint(0xffffff);
      player_2.setTint(0xa79999);
      play_btn.setTint(0xffffff).setInteractive();
    });
    player_2.on('pointerdown', () => {
      console.log('fox');
      SELECTED_CHARACTER = player_2;
      player_2.setTint(0xffffff);
      player_1.setTint(0xa79999);
      play_btn.setTint(0xffffff).setInteractive();
    });
    // модалки start
    const gearBtn = this.add.image(977, 71, GEAR_BTN).setInteractive({ useHandCursor: true }).setScale(0.47);
    gearBtn.name = 'GEAR_BTN';
    gearBtn.on('pointerdown', this.changeScene.bind(this, 'SettingsScene'), this);

    const helpBtn = this.add.image(976, 29, HELP_BTN).setInteractive({ useHandCursor: true }).setScale(0.25);
    helpBtn.name = 'help_btn';
    helpBtn.on('pointerdown', this.changeScene.bind(this, 'HelpScene'), this);

    this.textBtn = this.add
      .text(
        WIDTH_GAME / 2,
        HEIGHT_GAME - 80,
        'To start playing, select a character and press the Play button',
        MODAL_TEXT_STYLE
      )
      .setOrigin(0.5, 0.5);

    const play_btn = this.add
      .image(WIDTH_GAME / 2, HEIGHT_GAME - 30, PLAY_BTN)
      .setInteractive({ useHandCursor: true })
      .setScale(0.25);
    play_btn.name = 'play_btn';
    play_btn.on('pointerdown', () => {
      if (SELECTED_CHARACTER === null) {
        return;
      } else {
        this.scene.start('Game');
        console.log('Selected character: ', SELECTED_CHARACTER);
      }
    });
    play_btn.setTint(0xa79999);
    play_btn.disableInteractive();
  }
  private createAnimationPlayer(type: string): void {
    this.addAnimationToManager(`${ENTITY_ANIMATION.run}${type}`, type, 'Run_', 1, 8, 2, 15, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.jump}${type}`, type, 'Jump_', 1, 8, 2, 15, 0);
    this.addAnimationToManager(`${ENTITY_ANIMATION.idle}${type}`, type, 'Idle_', 1, 10, 2, 15, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.dead}${type}`, type, 'Dead_', 1, 10, 2, 15, 0);
  }

  private createAnimationZombie(type: string) {
    this.addAnimationToManager(`${ENTITY_ANIMATION.walk}${type}`, type, 'Walk_', 1, 6, 2, 10, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.dead}${type}`, type, 'Dead_', 1, 8, 2, 10, 0);
    this.addAnimationToManager(`${ENTITY_ANIMATION.run}${type}`, type, 'Run_', 3, 10, 2, 15, -1);
  }

  private createAnimationMoney() {
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
  ) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNames(type, { prefix: prefix, start: start, end: end, zeroPad: zeroPad }),
      frameRate: frameRate,
      repeat: repeat,
    });
  }

  private changeScene(nameScene: string) {
    this.scene.pause();
    this.scene.launch(nameScene, { scene: ESCENE.start });
  }
}
