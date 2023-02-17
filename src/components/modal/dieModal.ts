import { END_MODAL, MODAL_TEXT_STYLE, TITLE_STYLE, ESCENE } from '../../game/constGame';

export default class DieModal extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  header: Phaser.GameObjects.Text;
  restartText: Phaser.GameObjects.Text;
  isOpen!: boolean;
  homeBtn: Phaser.GameObjects.Image;
  reloadBtn: Phaser.GameObjects.Image;
  homeText: Phaser.GameObjects.Text;
  image: Phaser.GameObjects.Image;
  private _typeScene: string;

  constructor(
    scene: Phaser.Scene,
    x: number | undefined,
    y: number | undefined,
    width: number,
    height: number,
    isDied: boolean,
    typeScene: string
  ) {
    super(scene, x, y);
    this._typeScene = typeScene;

    this.background = scene.add
      .rectangle(0, 0, width, height, 0x2b2b2b, 1)
      .setOrigin(0.5, 0.5)
      .setStrokeStyle(3, 0x00ff00);
    this.background.scrollFactorX = 0;
    this.add(this.background);

    this.header = scene.add
      .text(0, -(height / 2) + 30, isDied ? 'Unfortunately you died... ' : 'Congratulations! You won ', TITLE_STYLE)
      .setOrigin(0.5, 0.5);
    this.header.scrollFactorX = 0;
    this.add(this.header);

    this.restartText = scene.add.text(23, 46, ' Press RESTART to restart level', MODAL_TEXT_STYLE).setOrigin(0.5, 0.5);
    this.restartText.scrollFactorX = 0;
    this.homeText = scene.add.text(2, 111, ' Press HOME to home page', MODAL_TEXT_STYLE).setOrigin(0.5, 0.5);
    this.homeText.scrollFactorX = 0;
    this.homeBtn = scene.add
      .image(-161, 111, END_MODAL.homeBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        this.close(ESCENE.start);
      });
    this.homeBtn.name = 'homeBtn';
    this.homeBtn.scrollFactorX = 0;

    this.reloadBtn = scene.add
      .image(-161, 46, END_MODAL.reloadBtn)
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

    this.add(this.image);
    this.add(this.restartText);
    this.add(this.homeText);
    this.add(this.homeBtn);
    this.add(this.reloadBtn);

    this.setSize(width, height);

    this.setVisible(false);
  }

  public open(): void {
    console.log('open modal');
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

  private close(typeScene: ESCENE): void {
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
        this.scene.scene.start(typeScene, { scene: ESCENE.end });
      },
    });
  }
}
