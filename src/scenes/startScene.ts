import hotkeys from 'hotkeys-js';
import i18next from 'i18next';
import enTranslation from '../components/locale/en.json';
import ruTranslation from '../components/locale/ru.json';
import lvTranslation from '../components/locale/lv.json';
import {
  PLAYER_TYPE,
  ESCENE,
  CAT_AVATAR,
  FOX_AVATAR,
  GAME_BACKGROUND,
  TITLE_STYLE,
  MODAL_TEXT_STYLE,
  IMAGES,
  EBUTTON,
} from '../game/constGame';

i18next.init({
  lng: localStorage.getItem('lang') || 'en',
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
    lv: { translation: lvTranslation },
  },
});

const POSITION_LVL = { x: 100, y: 80 };
const POSITION_TITLE_LVL = 70;
const POSITION_LNG_X = 26;
const POSITION_EN_Y = 30;
const POSITION_RU_Y = 72;
const POSITION_LV_Y = 112;
const POSITION_Y = 30;
const POSITION_X_BTN = 977;
const POSITION_Y_GEAR = 71;
const POSITION_Y_HELP = 29;

document.addEventListener('keydown', function (event) {
  if (event.key === 'F1' || event.key === 'F2') {
    event.preventDefault();
  }
});
export default class StartScene extends Phaser.Scene {
  private _levelSelected = 1;

  constructor() {
    super('Start');
  }
  public create(): void {
    //
    const enButton = this.add
      .image(POSITION_LNG_X, POSITION_EN_Y, EBUTTON.langEn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.8)
      .setTint(0xfd581e);
    enButton.name = EBUTTON.langEn;
    enButton.on('pointerdown', () => {
      i18next.changeLanguage('en').then(() => {
        localStorage.setItem('lang', 'en');
        this.scene.restart();
        this.chooseTint();
      });
    });
    const ruButton = this.add
      .image(POSITION_LNG_X, POSITION_RU_Y, EBUTTON.langRu)
      .setInteractive({ useHandCursor: true })
      .setScale(0.8);
    ruButton.name = EBUTTON.langRu;
    ruButton.on('pointerdown', () => {
      i18next.changeLanguage('ru').then(() => {
        localStorage.setItem('lang', 'ru');
        this.scene.restart();
        this.chooseTint();
      });
    });
    const lvButton = this.add
      .image(POSITION_LNG_X, POSITION_LV_Y, EBUTTON.langLv)
      .setInteractive({ useHandCursor: true })
      .setScale(0.8);
    lvButton.name = EBUTTON.langLv;
    lvButton.on('pointerdown', () => {
      i18next.changeLanguage('lv').then(() => {
        localStorage.setItem('lang', 'lv');
        this.scene.restart();
        this.chooseTint();
      });
    });
    //
    this.cameras.main.setBackgroundColor(GAME_BACKGROUND);
    const choose_title = this.add
      .text(+this.game.config.width / 2, POSITION_Y, i18next.t<string>(`chooseChar`), TITLE_STYLE)
      .setOrigin(0.5, 0.5);
    choose_title.name = 'title';

    const playerCat = this.add
      .image(+this.game.config.width / 2 - 100, +this.game.config.height / 2 - 200, CAT_AVATAR)
      .setInteractive({ useHandCursor: true })
      .setScale(0.2);
    const playerFox = this.add
      .image(+this.game.config.width / 2 + 100, +this.game.config.height / 2 - 200, FOX_AVATAR)
      .setInteractive({ useHandCursor: true })
      .setScale(0.2);
    playerCat.name = PLAYER_TYPE.cat;
    playerFox.name = PLAYER_TYPE.fox;
    playerCat.setTint(0xa79999);
    playerFox.setTint(0xa79999);

    let SELECTED_CHARACTER: Phaser.GameObjects.Image | null = null;

    playerCat.on('pointerdown', () => {
      SELECTED_CHARACTER = playerCat;
      playerCat.setTint(0xffffff);
      playerFox.setTint(0xa79999);
      play_btn.setTint(0xffffff).setInteractive();
    });
    playerFox.on('pointerdown', () => {
      SELECTED_CHARACTER = playerFox;
      playerFox.setTint(0xffffff);
      playerCat.setTint(0xa79999);
      play_btn.setTint(0xffffff).setInteractive();
    });
    // модалки start
    const gearBtn = this.add
      .image(POSITION_X_BTN, POSITION_Y_GEAR, EBUTTON.gear)
      .setInteractive({ useHandCursor: true })
      .setScale(0.47);
    gearBtn.name = EBUTTON.gear;
    gearBtn.on('pointerdown', this.changeScene.bind(this, ESCENE.settings), this);

    const helpBtn = this.add
      .image(POSITION_X_BTN, POSITION_Y_HELP, EBUTTON.help)
      .setInteractive({ useHandCursor: true })
      .setScale(0.25);
    helpBtn.name = 'help_btn';
    helpBtn.on('pointerdown', this.changeScene.bind(this, ESCENE.help), this);
    hotkeys('f1', () => {
      this.changeScene(ESCENE.help);
    });
    hotkeys('f2', () => {
      this.changeScene(ESCENE.settings);
    });
    this.add
      .text(
        +this.game.config.width / 2,
        +this.game.config.height - 80,
        i18next.t<string>(`playDescription`),
        MODAL_TEXT_STYLE
      )
      .setOrigin(0.5, 0.5);

    const play_btn = this.add
      .image(+this.game.config.width / 2, +this.game.config.height - 30, EBUTTON.play)
      .setInteractive({ useHandCursor: true })
      .setScale(0.25);
    play_btn.name = EBUTTON.play;
    play_btn.on('pointerdown', () => {
      if (SELECTED_CHARACTER === null) {
        return;
      } else {
        this.scene.pause();
        this.scene.start(ESCENE.game, {
          scene: ESCENE.start,
          playerType: SELECTED_CHARACTER.name,
          levelNumber: this._levelSelected,
        });
      }
    });
    this.levelChooseView();
    play_btn.setTint(0xa79999);
    play_btn.disableInteractive();
    this.chooseTint();
  }

  private chooseTint(): void {
    const currentLang = localStorage.getItem('lang');
    const enButtonImg = this.children.getByName(EBUTTON.langEn) as Phaser.GameObjects.Image;
    const ruButtonImg = this.children.getByName(EBUTTON.langRu) as Phaser.GameObjects.Image;
    const lvButtonImg = this.children.getByName(EBUTTON.langLv) as Phaser.GameObjects.Image;
    switch (currentLang) {
      case 'en':
        enButtonImg.setTint(0xfd581e);
        ruButtonImg.setTint(0xffffff);
        lvButtonImg.setTint(0xffffff);
        break;
      case 'ru':
        enButtonImg.setTint(0xffffff);
        ruButtonImg.setTint(0xfd581e);
        lvButtonImg.setTint(0xffffff);
        break;
      case 'lv':
        enButtonImg.setTint(0xffffff);
        ruButtonImg.setTint(0xffffff);
        lvButtonImg.setTint(0xfd581e);
    }
  }

  private changeScene(nameScene: string): void {
    this.scene.pause();
    this.scene.launch(nameScene, { scene: ESCENE.start });
  }

  private levelChooseView() {
    const choose_title = this.add
      .text(
        +this.game.config.width / 2,
        +this.game.config.height / 2 - POSITION_TITLE_LVL,
        i18next.t<string>(`chooseLevel`),
        TITLE_STYLE
      )
      .setOrigin(0.5);
    choose_title.name = 'titleLevel';

    const level1 = this.add
      .image(
        +this.game.config.width / 2 - POSITION_LVL.x,
        +this.game.config.height / 2 + POSITION_LVL.y,
        `${IMAGES.bgLevel}1svg`
      )
      .setInteractive({ useHandCursor: true })
      .setScale(0.4);
    const level2 = this.add
      .image(
        +this.game.config.width / 2 + POSITION_LVL.x,
        +this.game.config.height / 2 + POSITION_LVL.y,
        `${IMAGES.bgLevel}2svg`
      )
      .setInteractive({ useHandCursor: true })
      .setScale(0.37);
    level1.name = `${IMAGES.bgLevel}1`;
    level2.name = `${IMAGES.bgLevel}2`;
    level1.setTint(0xffffff);
    level2.setTint(0xa79999);

    level1.on('pointerdown', () => {
      this._levelSelected = 1;
      level1.setTint(0xffffff);
      level2.setTint(0xa79999);
    });
    level2.on('pointerdown', () => {
      this._levelSelected = 2;
      level2.setTint(0xffffff);
      level1.setTint(0xa79999);
    });
  }
}
