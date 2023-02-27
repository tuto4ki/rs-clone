import hotkeys from 'hotkeys-js';
import i18next from 'i18next';
import enTranslation from '../components/locale/en.json';
import ruTranslation from '../components/locale/ru.json';
import lvTranslation from '../components/locale/lv.json';
import { ScoreView } from '../components/score/scoreView';
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
  ELANG,
} from '../game/constGame';
import { isLoginLS } from '../components/controller/localStorage';

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
const POSITION_Y_LDRBRD = 112;
const COLOR_ACTIVE = 0xffffff;
const COLOR_NOACTIVE = 0xa79999;

document.addEventListener('keydown', function (event) {
  if (event.key === 'F1' || event.key === 'F2') {
    event.preventDefault();
  }
});
export default class StartScene extends Phaser.Scene {
  private _levelSelected = 1;

  constructor() {
    super(ESCENE.start);
  }

  public create(): void {
    this.cameras.main.setBackgroundColor(GAME_BACKGROUND);
    const choose_title = this.add
      .text(+this.game.config.width / 2, POSITION_Y, i18next.t<string>(`chooseChar`), TITLE_STYLE)
      .setOrigin(0.5, 0.5);
    choose_title.name = 'title';
    // create button language
    this.createButtonLanguage(POSITION_LNG_X, POSITION_EN_Y, EBUTTON.langEn, ELANG.en);
    this.createButtonLanguage(POSITION_LNG_X, POSITION_RU_Y, EBUTTON.langRu, ELANG.ru);
    this.createButtonLanguage(POSITION_LNG_X, POSITION_LV_Y, EBUTTON.langLv, ELANG.lv);

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
    playerCat.setTint(COLOR_ACTIVE);
    playerFox.setTint(COLOR_NOACTIVE);
    // chack registartion
    const isLogin = isLoginLS();
    let SELECTED_CHARACTER: Phaser.GameObjects.Image = playerCat;
    if (isLogin) {
      playerCat.on('pointerdown', () => {
        SELECTED_CHARACTER = playerCat;
        playerCat.setTint(COLOR_ACTIVE);
        playerFox.setTint(COLOR_NOACTIVE);
        // play_btn.setTint(COLOR_ACTIVE).setInteractive();
      });
      playerFox.on('pointerdown', () => {
        SELECTED_CHARACTER = playerFox;
        playerFox.setTint(COLOR_ACTIVE);
        playerCat.setTint(COLOR_NOACTIVE);
        // play_btn.setTint(COLOR_ACTIVE).setInteractive();
      });
    } else {
      playerCat.disableInteractive();
      playerFox.disableInteractive();
    }
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
    helpBtn.name = EBUTTON.help;
    helpBtn.on('pointerdown', this.changeScene.bind(this, ESCENE.help), this);

    const leaderboardBtn = this.add
      .image(POSITION_X_BTN, POSITION_Y_LDRBRD, EBUTTON.leaderboard)
      .setInteractive({ useHandCursor: true })
      .setScale(0.25);
    leaderboardBtn.name = EBUTTON.help;
    leaderboardBtn.on('pointerdown', this.showScore.bind(this), this);

    // add hot keys
    hotkeys('f1', () => {
      this.changeScene(ESCENE.help);
    });
    hotkeys('f2', () => {
      this.changeScene(ESCENE.settings);
    });
    if (!isLogin) {
      this.createLinkLogin();
    }
    const play_btn = this.add
      .image(+this.game.config.width / 2, +this.game.config.height - 30, EBUTTON.play)
      .setInteractive({ useHandCursor: true })
      .setScale(0.25);
    play_btn.name = EBUTTON.play;
    play_btn.on('pointerdown', () => {
      if (!SELECTED_CHARACTER) {
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
    this.levelChooseView(isLogin);
    play_btn.setTint(COLOR_ACTIVE);
    // play_btn.disableInteractive();
    this.chooseTint();
  }

  private chooseTint(): void {
    const currentLang = localStorage.getItem('lang');
    const enButtonImg = this.children.getByName(EBUTTON.langEn) as Phaser.GameObjects.Image;
    const ruButtonImg = this.children.getByName(EBUTTON.langRu) as Phaser.GameObjects.Image;
    const lvButtonImg = this.children.getByName(EBUTTON.langLv) as Phaser.GameObjects.Image;
    switch (currentLang) {
      case ELANG.en:
        enButtonImg.setTint(COLOR_ACTIVE);
        ruButtonImg.setTint(COLOR_NOACTIVE);
        lvButtonImg.setTint(COLOR_NOACTIVE);
        break;
      case ELANG.ru:
        enButtonImg.setTint(COLOR_NOACTIVE);
        ruButtonImg.setTint(COLOR_ACTIVE);
        lvButtonImg.setTint(COLOR_NOACTIVE);
        break;
      case ELANG.lv:
        enButtonImg.setTint(COLOR_NOACTIVE);
        ruButtonImg.setTint(COLOR_NOACTIVE);
        lvButtonImg.setTint(COLOR_ACTIVE);
    }
  }

  private changeScene(nameScene: string): void {
    this.scene.pause();
    this.scene.launch(nameScene, { scene: ESCENE.start });
  }

  private levelChooseView(isLogin: boolean) {
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
      .setInteractive({ useHandCursor: true });
    const level2 = this.add
      .image(
        +this.game.config.width / 2 + POSITION_LVL.x,
        +this.game.config.height / 2 + POSITION_LVL.y,
        `${IMAGES.bgLevel}2svg`
      )
      .setInteractive({ useHandCursor: true });
    level1.name = `${IMAGES.bgLevel}1`;
    level2.name = `${IMAGES.bgLevel}2`;
    level1.setTint(COLOR_ACTIVE);
    level2.setTint(COLOR_NOACTIVE);

    if (isLogin) {
      level1.on('pointerdown', () => {
        this._levelSelected = 1;
        level1.setTint(COLOR_ACTIVE);
        level2.setTint(COLOR_NOACTIVE);
      });
      level2.on('pointerdown', () => {
        this._levelSelected = 2;
        level2.setTint(COLOR_ACTIVE);
        level1.setTint(COLOR_NOACTIVE);
      });
    } else {
      level1.disableInteractive();
      level2.disableInteractive();
    }
  }

  private createButtonLanguage(x: number, y: number, langImg: EBUTTON, lang: ELANG): void {
    const langButton = this.add
      .image(x, y, langImg)
      .setInteractive({ useHandCursor: true })
      .setScale(0.8)
      .setTint(COLOR_ACTIVE);
    langButton.name = langImg;
    langButton.on('pointerdown', () => {
      i18next.changeLanguage(lang).then(() => {
        localStorage.setItem('lang', lang);
        this.scene.restart();
        this.chooseTint();
      });
    });
  }

  private showScore() {
    const score = new ScoreView();
    const scoreView = score.getScoreView();
    scoreView.then((tableScore) => {
      document.querySelector('.main')?.classList.add('hidden');
      document.querySelector('.popup')?.append(tableScore);
      document.querySelector('.popupBg')?.classList.remove('hidden');
      document.querySelector('.popupBg')?.classList.add('flex');
      const btn = document.querySelector('.button');
      if (btn?.innerHTML) {
        btn.innerHTML = i18next.t<string>('back');
      }
    });
  }

  private createLinkLogin() {
    const linkLogin = this.add
      .text(
        +this.game.config.width / 2,
        +this.game.config.height - 80,
        i18next.t<string>(`playDescription`),
        MODAL_TEXT_STYLE
      )
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5, 0.5);
    linkLogin.on('pointerdown', () => {
      window.location.href = '';
    });
  }
}
