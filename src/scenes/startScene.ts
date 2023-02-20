import hotkeys from 'hotkeys-js';
import {
  PLAYER_TYPE,
  HEIGHT_GAME,
  WIDTH_GAME,
  ESCENE,
  GEAR_BTN,
  HELP_BTN,
  PLAY_BTN,
  CAT_AVATAR,
  FOX_AVATAR,
  GAME_BACKGROUND,
  TITLE_STYLE,
  MODAL_TEXT_STYLE,
} from '../game/constGame';

document.addEventListener('keydown', function (event) {
  if (event.key === 'F1' || event.key === 'F2') {
    event.preventDefault();
  }
});
export default class StartScene extends Phaser.Scene {
  selectedCharacter: unknown;
  textBtn: Phaser.GameObjects.Text | undefined;

  constructor() {
    super('Start');
  }
  public create(): void {
    this.cameras.main.setBackgroundColor(GAME_BACKGROUND);
    const choose_title = this.add.text(WIDTH_GAME / 2, 30, 'Choose Your Character ', TITLE_STYLE).setOrigin(0.5, 0.5);
    choose_title.name = 'title';

    const playerCat = this.add
      .image(WIDTH_GAME / 2 - 100, HEIGHT_GAME / 2 - 200, CAT_AVATAR)
      .setInteractive({ useHandCursor: true })
      .setScale(0.2);
    const playerFox = this.add
      .image(WIDTH_GAME / 2 + 100, HEIGHT_GAME / 2 - 200, FOX_AVATAR)
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
    const gearBtn = this.add.image(977, 71, GEAR_BTN).setInteractive({ useHandCursor: true }).setScale(0.47);
    gearBtn.name = 'GEAR_BTN';
    gearBtn.on('pointerdown', this.changeScene.bind(this, 'SettingsScene'), this);

    const helpBtn = this.add.image(976, 29, HELP_BTN).setInteractive({ useHandCursor: true }).setScale(0.25);
    helpBtn.name = 'help_btn';
    helpBtn.on('pointerdown', this.changeScene.bind(this, 'HelpScene'), this);
    hotkeys('f1', () => {
      this.changeScene('HelpScene');
    });
    hotkeys('f2', () => {
      this.changeScene('SettingsScene');
    });
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
        this.scene.pause();
        this.scene.start(ESCENE.game, { scene: ESCENE.start, playerType: SELECTED_CHARACTER.name });
      }
    });
    play_btn.setTint(0xa79999);
    play_btn.disableInteractive();
  }

  private changeScene(nameScene: string): void {
    this.scene.pause();
    this.scene.launch(nameScene, { scene: ESCENE.start });
  }
}
