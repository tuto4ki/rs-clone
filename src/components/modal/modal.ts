export default class Modal extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  header: Phaser.GameObjects.Text;
  soundOffText: Phaser.GameObjects.Text;
  closeButton: Phaser.GameObjects.Image;
  isOpen!: boolean;
  soundOffBtn: Phaser.GameObjects.Image;
  soundOnBtn: Phaser.GameObjects.Image;
  soundOnText: Phaser.GameObjects.Text;
  soundOffIsClicked: boolean;
  soundOnIsClicked: boolean;
  // isOpen: boolean;

  constructor(scene: Phaser.Scene, x: number | undefined, y: number | undefined, width: number, height: number) {
    super(scene, x, y);

    this.background = scene.add
      .rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0.5, 0.5)
      // .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        // this.close();
      });

    this.add(this.background);

    this.header = scene.add
      .text(0, -(height / 2) + 20, 'Settings', {
        fontFamily: 'Itim',
        fontSize: '30px',
        color: '#F5F901',
        stroke: '#E52121',
        strokeThickness: 6,
        shadow: { color: '#010101', fill: true, blur: 4, offsetX: 6, offsetY: 0 },
      })
      .setOrigin(0.5, 0.5);

    this.add(this.header);

    this.soundOffText = scene.add
      .text(10, 45, '- click to sound off', {
        fontFamily: 'Itim',
        fontSize: '22px',
        color: '#EB230C',
        stroke: '#EFAB0D',
        strokeThickness: 3,
        shadow: { color: '#F10808', fill: true, blur: 3, offsetX: 1, offsetY: 0 },
      })
      .setOrigin(0.5, 0.5);

    this.soundOnText = scene.add
      .text(10, -20, '- click to sound on', {
        fontFamily: 'Itim',
        fontSize: '22px',
        color: '#EB230C',
        stroke: '#EFAB0D',
        strokeThickness: 3,
        shadow: { color: '#F10808', fill: true, blur: 3, offsetX: 1, offsetY: 0 },
      })
      .setOrigin(0.5, 0.5);

    this.soundOffBtn = scene.add
      .image(-111, 45, 'soundOffBtn')
      .setInteractive({ useHandCursor: true })
      .setScale(0.3)
      .setOrigin(0.5, 0.5)
      .on('pointerdown', () => {
        console.log('soundOff');
        this.soundOnBtn.setTint(0xffffff);
        this.soundOffBtn.setTint(0xa79999);
      });
    this.soundOffBtn.name = 'soundOffBtn';
    this.soundOffIsClicked = false;
    this.soundOnIsClicked = true;
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

    this.add(this.soundOffText);
    this.add(this.soundOnText);
    this.add(this.soundOffBtn);
    this.add(this.soundOnBtn);

    this.closeButton = scene.add
      .image(130, -80, 'closeBtn')
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
