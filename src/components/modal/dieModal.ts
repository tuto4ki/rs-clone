import { END_MODAL, MODAL_TEXT_STYLE, TITLE_STYLE, ESCENE, EBUTTON, PLAYER_TYPE } from '../../game/constGame';

// const TEXT_POS = 100;
const SCALE_BTN = 0.3;
export default class DieModal extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle;
  private header: Phaser.GameObjects.Text;
  private restartText: Phaser.GameObjects.Text;
  private isOpen!: boolean;
  private homeBtn: Phaser.GameObjects.Image;
  private reloadBtn: Phaser.GameObjects.Image;
  private homeText: Phaser.GameObjects.Text;
  private image: Phaser.GameObjects.Image;
  private _nextLevelBtn: Phaser.GameObjects.Image;
  private _nextLevelText: Phaser.GameObjects.Text;
  private _playerType: PLAYER_TYPE;
  private _typeScene: string;

  constructor(
    scene: Phaser.Scene,
    x: number | undefined,
    y: number | undefined,
    width: number,
    height: number,
    isDied: boolean,
    typeScene: string,
    playerType: PLAYER_TYPE,
    isLevelNext = false
  ) {
    super(scene, x, y);
    this._typeScene = typeScene;
    this._playerType = playerType;
    this.background = scene.add
      .rectangle(0, 0, width, height, 0x2b2b2b, 1)
      .setOrigin(0.5, 0.5)
      .setStrokeStyle(3, 0x00ff00);
    this.background.scrollFactorX = 0;
    this.add(this.background);
    const posTextY = isDied || !isLevelNext ? 20 : 0;
    this.header = scene.add
      .text(0, -(height / 2) + 30, isDied ? 'Unfortunately you died... ' : 'Congratulations! You won ', TITLE_STYLE)
      .setOrigin(0.5, 0.5);
    this.header.scrollFactorX = 0;
    this.add(this.header);
    this.homeBtn = scene.add
      .image(-161, 130 - posTextY, END_MODAL.homeBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.close(ESCENE.start);
      });
    this.homeBtn.name = 'homeBtn';
    this.homeBtn.scrollFactorX = 0;

    this.reloadBtn = scene.add
      .image(-161, 75 - posTextY, END_MODAL.reloadBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.close(ESCENE.game);
      });
    this.reloadBtn.name = 'reloadBtn';
    this.reloadBtn.scrollFactorX = 0;

    this.image = scene.add.image(0, -42, isDied ? END_MODAL.gravestone : END_MODAL.winCup).setOrigin(0.5, 0.5);
    this.image.name = isDied ? END_MODAL.gravestone : END_MODAL.winCup;
    const posTextX = -width / 2 + this.homeBtn.width * SCALE_BTN + 35;
    this.restartText = scene.add
      .text(posTextX, 75 - posTextY, 'Press RESTART to restart level', MODAL_TEXT_STYLE)
      .setOrigin(0, 0.5);
    this.restartText.scrollFactorX = 0;
    this.homeText = scene.add
      .text(posTextX, 130 - posTextY, 'Press HOME to home page', MODAL_TEXT_STYLE)
      .setOrigin(0, 0.5);
    this.homeText.scrollFactorX = 0;

    this._nextLevelBtn = scene.add
      .image(-161, 20, EBUTTON.nextLevel)
      .setInteractive({ useHandCursor: true })
      .setScale(-SCALE_BTN, SCALE_BTN)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.close(ESCENE.tunnel, isLevelNext);
      });
    this._nextLevelText = scene.add.text(posTextX, 20, 'Next Level', MODAL_TEXT_STYLE).setOrigin(0, 0.5);
    this._nextLevelText.scrollFactorX = 0;
    if (!isDied && isLevelNext) {
      this.add(this._nextLevelBtn);
      this.add(this._nextLevelText);
    }

    this.add(this.image);
    this.add(this.restartText);
    this.add(this.homeText);
    this.add(this.homeBtn);
    this.add(this.reloadBtn);

    this.setSize(width, height);

    this.setVisible(false);
  }

  public open(): void {
    this.background.setAlpha(1);
    this.setVisible(true);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      ease: 'Back',
      duration: 1000,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.isOpen = true;
      },
    });
  }

  private close(typeScene: ESCENE, isLevelNext = false): void {
    this.background.setAlpha(0);
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      ease: 'none',
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.isOpen = false;
        this.setVisible(false);
        this.scene.scene.start(typeScene, {
          scene: ESCENE.end,
          isLevelNext: isLevelNext,
          playerType: this._playerType,
        });
      },
    });
  }
}
