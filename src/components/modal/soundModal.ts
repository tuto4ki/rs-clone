import { CLOSE_BTN, SOUND_BTNS } from '../../game/constGame';

export default class SoundModal extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  header: Phaser.GameObjects.Text;
  soundOnOffText: Phaser.GameObjects.Text;
  closeButton: Phaser.GameObjects.Image;
  isOpen!: boolean;
  musicOffBtn: Phaser.GameObjects.Image;
  musicOnBtn: Phaser.GameObjects.Image;
  musicOnOffText: Phaser.GameObjects.Text;
  soundOffBtn: Phaser.GameObjects.Image;
  soundOnBtn: Phaser.GameObjects.Image;
  private _typeScene: string;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, typeScene: string) {
    super(scene, x, y);
    this._typeScene = typeScene;

    this.background = scene.add
      .rectangle(0, 0, width, height, 0x2b2b2b, 1)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(3, 0x00ff00);
    this.background.scrollFactorX = 0;
    this.add(this.background);

    this.header = scene.add
      .text(0, -(height / 2) + 20, 'Sound settings ', {
        fontFamily: 'Itim',
        fontSize: '30px',
        color: '#F5F901',
        stroke: '#E52121',
        strokeThickness: 6,
        shadow: { color: '#010101', fill: true, blur: 4, offsetX: 6, offsetY: 0 },
      })
      .setOrigin(0.5, 0.5);
    this.header.scrollFactorX = 0;
    this.add(this.header);

    this.soundOnOffText = scene.add
      .text(20, 45, '- click to ON/OFF sound', {
        fontFamily: 'Itim',
        fontSize: '22px',
        color: '#fff',
        stroke: '#C83737',
        strokeThickness: 2,
      })
      .setOrigin(0.5, 0.5);
    this.soundOnOffText.scrollFactorX = 0;
    this.musicOnOffText = scene.add
      .text(20, -20, '- click to ON/OFF music', {
        fontFamily: 'Itim',
        fontSize: '22px',
        color: '#fff',
        stroke: '#C83737',
        strokeThickness: 2,
      })
      .setOrigin(0.5, 0.5);
    this.musicOnOffText.scrollFactorX = 0;
    this.musicOffBtn = scene.add
      .image(-125, -20, SOUND_BTNS.musicOffBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('musicOffBtn');
        this.musicOnBtn.setDepth(2);
        this.musicOnBtn.setAlpha(1);
        this.musicOffBtn.setAlpha(0);
      });
    this.musicOffBtn.name = 'musicOffBtn';
    this.musicOffBtn.scrollFactorX = 0;
    this.musicOnBtn = scene.add
      .image(-125, -20, SOUND_BTNS.musicOnBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('musicOnBtn');
        this.musicOffBtn.setDepth(2);
        this.musicOnBtn.setAlpha(0);
        this.musicOffBtn.setAlpha(1);
      });
    this.musicOnBtn.name = 'musicOnBtn';
    this.musicOnBtn.scrollFactorX = 0;
    this.soundOffBtn = scene.add
      .image(-125, 45, SOUND_BTNS.soundOffBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('soundOffBtn');
        this.soundOnBtn.setDepth(2);
        this.soundOnBtn.setAlpha(1);
        this.soundOffBtn.setAlpha(0);
      });
    this.soundOffBtn.name = 'soundOffBtn';
    this.soundOffBtn.scrollFactorX = 0;
    this.soundOnBtn = scene.add
      .image(-125, 45, SOUND_BTNS.soundOnBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('soundOnBtn');
        this.soundOffBtn.setDepth(2);
        this.soundOffBtn.setAlpha(1);
        this.soundOnBtn.setAlpha(0);
      });
    this.soundOnBtn.name = 'soundOnBtn';
    this.soundOnBtn.scrollFactorX = 0;

    this.add(this.soundOnOffText);
    this.add(this.musicOnOffText);
    this.add(this.musicOffBtn);
    this.add(this.musicOnBtn);
    this.add(this.soundOffBtn);
    this.add(this.soundOnBtn);

    this.closeButton = scene.add
      .image(168, -98, CLOSE_BTN)
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
  }

  open() {
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

  close() {
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
        this.scene.scene.resume(this._typeScene);
        this.isOpen = false;
        this.setVisible(false);
      },
    });
  }
}
