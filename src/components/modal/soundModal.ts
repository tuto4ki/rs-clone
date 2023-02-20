import { CLOSE_BTN, MODAL_TEXT_STYLE, SOUND_BTNS, TITLE_STYLE } from '../../game/constGame';

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
  public isPlayMusic: boolean;
  public isPlaySoundEffect: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    typeScene: string
    // isPlayMusic?: boolean,
    // isPlaySoundEffect?: boolean
  ) {
    super(scene, x, y);
    this._typeScene = typeScene;
    this.isPlayMusic = JSON.parse(localStorage.getItem('isPlayMusic') || 'true');
    this.isPlaySoundEffect = JSON.parse(localStorage.getItem('isPlaySoundEffect') || 'true');
    this.background = scene.add
      .rectangle(0, 0, width, height, 0x2b2b2b, 1)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(3, 0x00ff00);
    this.background.scrollFactorX = 0;
    this.add(this.background);

    this.header = scene.add.text(0, -(height / 2) + 20, 'Sound settings ', TITLE_STYLE).setOrigin(0.5, 0.5);
    this.header.scrollFactorX = 0;
    this.add(this.header);

    this.soundOnOffText = scene.add.text(20, 45, '- click to ON/OFF sound', MODAL_TEXT_STYLE).setOrigin(0.5, 0.5);
    this.soundOnOffText.scrollFactorX = 0;
    this.musicOnOffText = scene.add.text(20, -20, '- click to ON/OFF music', MODAL_TEXT_STYLE).setOrigin(0.5, 0.5);
    this.musicOnOffText.scrollFactorX = 0;
    this.musicOffBtn = scene.add
      .image(-125, -20, SOUND_BTNS.musicOffBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('musicOffBtn');
        this.isPlayMusic = true;
        this.setDepthBtnsMusic();
        localStorage.setItem('isPlayMusic', JSON.stringify(true));
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
        this.isPlayMusic = false;
        this.setDepthBtnsMusic();
        localStorage.setItem('isPlayMusic', JSON.stringify(false));
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
        this.isPlaySoundEffect = true;
        this.setDepthBtnsEffect();
        localStorage.setItem('isPlaySoundEffect', JSON.stringify(true));
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
        this.isPlaySoundEffect = false;
        this.setDepthBtnsEffect();
        localStorage.setItem('isPlaySoundEffect', JSON.stringify(false));
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
    this.setDepthBtnsMusic();
    this.setDepthBtnsEffect();
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

  setDepthBtnsMusic() {
    if (this.isPlayMusic) {
      this.setMusicBtnsParams(2, 0, 1, 0);
    } else {
      this.setMusicBtnsParams(0, 2, 0, 1);
    }
  }

  setMusicBtnsParams(a: number, b: number, c: number, d: number): void {
    this.musicOnBtn.setDepth(a);
    this.musicOffBtn.setDepth(b);
    this.musicOnBtn.setAlpha(c);
    this.musicOffBtn.setAlpha(d);
  }

  setDepthBtnsEffect() {
    if (this.isPlaySoundEffect) {
      this.setEffectBtnsParams(2, 0, 1, 0);
    } else {
      this.setEffectBtnsParams(0, 2, 0, 1);
    }
  }
  setEffectBtnsParams(a: number, b: number, c: number, d: number): void {
    this.soundOnBtn.setDepth(a);
    this.soundOffBtn.setDepth(b);
    this.soundOnBtn.setAlpha(c);
    this.soundOffBtn.setAlpha(d);
  }
}
