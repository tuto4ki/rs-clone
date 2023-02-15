import { CLOSE_BTN, END_MODAL } from '../../game/constGame';

export default class DieModal extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  header: Phaser.GameObjects.Text;
  restartText: Phaser.GameObjects.Text;
  closeButton: Phaser.GameObjects.Image;
  isOpen!: boolean;
  homeBtn: Phaser.GameObjects.Image;
  reloadBtn: Phaser.GameObjects.Image;
  homeText: Phaser.GameObjects.Text;
  image: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    x: number | undefined,
    y: number | undefined,
    width: number,
    height: number,
    isDied: boolean
  ) {
    super(scene, x, y);

    this.background = scene.add
      .rectangle(0, 0, width, height, 0x2b2b2b, 1)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(3, 0x00ff00);
    //
    // .on('pointerdown', () => {
    //   // this.close();
    // });

    this.add(this.background);

    this.header = scene.add
      .text(0, -(height / 2) + 30, isDied ? 'Unfortunately you died... ' : 'Congratulations! You won ', {
        fontFamily: 'Itim',
        fontSize: '30px',
        color: '#F5F901',
        stroke: '#E52121',
        strokeThickness: 6,
        shadow: { color: '#010101', fill: true, blur: 4, offsetX: 6, offsetY: 0 },
      })
      .setOrigin(0.5, 0.5);

    this.add(this.header);

    this.restartText = scene.add
      .text(23, 46, ' Press RESTART to restart level', {
        fontFamily: 'Itim',
        fontSize: '22px',
        color: '#fff',
        stroke: '#C83737',
        strokeThickness: 2,
      })
      .setOrigin(0.5, 0.5);
    this.homeText = scene.add
      .text(2, 111, ' Press HOME to home page', {
        fontFamily: 'Itim',
        fontSize: '22px',
        color: '#fff',
        stroke: '#C83737',
        strokeThickness: 2,
      })
      .setOrigin(0.5, 0.5);

    this.homeBtn = scene.add
      .image(-161, 111, END_MODAL.homeBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('homeBtn');
      });
    this.homeBtn.name = 'homeBtn';

    this.reloadBtn = scene.add
      .image(-161, 46, END_MODAL.reloadBtn)
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('reloadBtn');
      });
    this.reloadBtn.name = 'reloadBtn';

    this.image = scene.add.image(0, -42, isDied ? END_MODAL.gravestone : END_MODAL.winCup).setOrigin(0.5, 0.5);
    this.image.name = isDied ? END_MODAL.gravestone : END_MODAL.winCup;

    this.add(this.image);
    this.add(this.restartText);
    this.add(this.homeText);
    this.add(this.homeBtn);
    this.add(this.reloadBtn);

    this.closeButton = scene.add
      .image(198, -146, CLOSE_BTN)
      .setScale(0.2)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.close();
      });
    this.closeButton.name = 'closeButton';

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
        this.isOpen = false;
        this.setVisible(false);
      },
    });
  }
}
