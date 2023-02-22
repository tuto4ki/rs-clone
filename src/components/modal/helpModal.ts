import i18next from 'i18next';
import { CLOSE_BTN, HOW_TO_PLAY, MODAL_TEXT_STYLE, MODAL_TEXT_STYLE_000, TITLE_STYLE } from '../../game/constGame';

export default class HelpModal extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Image;
  header: Phaser.GameObjects.Text;
  closeButton: Phaser.GameObjects.Image;
  isOpen!: boolean;
  howPlaySettings: Phaser.GameObjects.Text;
  howControl: Phaser.GameObjects.Text;
  private _typeScene: string;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, typeScene: string) {
    super(scene, x, y);
    this._typeScene = typeScene;

    this.background = scene.add
      .image(0, 0, HOW_TO_PLAY)
      .setDisplaySize(width, height)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.close();
      });

    this.add(this.background);

    this.header = scene.add
      .text(0, -(height / 2) + 20, i18next.t<string>(`howToPlay`), TITLE_STYLE)
      .setOrigin(0.5, 0.5);
    this.header.scrollFactorX = 0;

    this.add(this.header);

    this.howControl = scene.add.text(100, -220, i18next.t<string>(`pressBtns`), MODAL_TEXT_STYLE).setOrigin(0.5, 0.5);
    this.howControl.name = 'howControl';
    this.howControl.scrollFactorX = 0;

    this.add(this.howControl);

    this.howPlaySettings = scene.add
      .text(40, -40, i18next.t<string>(`descriptionsControl`), MODAL_TEXT_STYLE_000)
      .setOrigin(0.5, 0.5);
    this.howPlaySettings.name = 'howPlaySettings';
    this.howPlaySettings.scrollFactorX = 0;

    this.add(this.howPlaySettings);
    this.closeButton = scene.add
      .image(466, -340, CLOSE_BTN)
      .setScale(0.2)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.close();
      });
    this.closeButton.name = 'closeButton';
    this.closeButton.scrollFactorX = 0;

    this.add(this.closeButton);

    this.setSize(width, height);

    this.setVisible(false);

    this.setScrollElements(0);
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

  public close(): void {
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
        this.scene.scene.resume(this._typeScene);
      },
    });
  }

  private setScrollElements(value: number) {
    this.setScrollFactor(value);
    this.closeButton.setScrollFactor(value);
    this.background.setScrollFactor(value);
  }
}
