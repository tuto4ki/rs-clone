export default class DieModal extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  header: Phaser.GameObjects.Text;
  dieText: Phaser.GameObjects.Text;
  closeButton: Phaser.GameObjects.Image;
  isOpen!: boolean;
  soundOffBtn: Phaser.GameObjects.Image;
  soundOnBtn: Phaser.GameObjects.Image;
  soundOnText: Phaser.GameObjects.Text;
  soundOffIsClicked: boolean;
  soundOnIsClicked: boolean;
  homeBtn: Phaser.GameObjects.Image;
  // isOpen: boolean;

  constructor(scene: Phaser.Scene, x: number | undefined, y: number | undefined, width: number, height: number) {
    super(scene, x, y);

    this.background = scene.add
      .rectangle(0, 0, width, height, 0x2e2b2b, 0.8)
      .setOrigin(0.5, 0.5)
      // .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        // this.close();
      });

    this.add(this.background);

    this.header = scene.add
      .text(0, -(height / 2) + 20, 'Unfortunally you died...', {
        fontFamily: 'Itim',
        fontSize: '30px',
        color: '#F5F901',
        stroke: '#E52121',
        strokeThickness: 6,
        shadow: { color: '#010101', fill: true, blur: 4, offsetX: 6, offsetY: 0 },
      })
      .setOrigin(0.5, 0.5);

    this.add(this.header);

    this.dieText = scene.add
      .text(10, 45, '- click to sound off', {
        fontFamily: 'Itim',
        fontSize: '22px',
        color: '#fff',
        stroke: '#C83737',
        strokeThickness: 2,
      })
      .setOrigin(0.5, 0.5);

    this.homeBtn = scene.add
      .image(-111, 45, 'homeBtn')
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('homeBtn');
      });
    this.homeBtn.name = 'homeBtn';
    this.soundOnBtn = scene.add
      .image(-111, -20, 'soundOnBtn')
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .setTint(0xa79999)
      .on('pointerdown', () => {
        console.log('soundOn');
        this.soundOnBtn.setTint(0xa79999);
        this.soundOffBtn.setTint(0xffffff);
      });
    this.soundOnBtn.name = 'soundOnBtn';

    this.add(this.dieText);
    this.add(this.homeBtn);
    // this.add(this.soundOffBtn);
    this.add(this.soundOnBtn);

    this.closeButton = scene.add
      .image(148, -96, 'closeBtn')
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
    this.background.setAlpha(0.4);
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
