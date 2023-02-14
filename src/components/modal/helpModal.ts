export default class helpModal extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Image;
  header: Phaser.GameObjects.Text;
  closeButton: Phaser.GameObjects.Image;
  isOpen!: boolean;
  howPlaySettings: Phaser.GameObjects.Text;
  howControl: Phaser.GameObjects.Text;

  // isOpen: boolean;

  constructor(scene: Phaser.Scene, x: number | undefined, y: number | undefined, width: number, height: number) {
    super(scene, x, y);

    this.background = scene.add
      .image(0, 0, 'howToPlay')
      .setDisplaySize(width, height)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.close();
      });

    this.add(this.background);

    this.header = scene.add
      .text(0, -(height / 2) + 20, 'How to play ', {
        fontFamily: 'Itim',
        fontSize: '30px',
        color: '#F5F901',
        stroke: '#E52121',
        strokeThickness: 6,
        shadow: { color: '#010101', fill: true, blur: 4, offsetX: 6, offsetY: 0 },
      })
      .setOrigin(0.5, 0.5);

    this.add(this.header);

    this.howControl = scene.add
      .text(40, -220, '- Press UP to JUMP\n\n- Press LEFT to move left\n\n- Press RIGHT to move right', {
        fontFamily: 'Itim',
        fontSize: '22px',
        color: '#fff',
        stroke: '#C83737',
        strokeThickness: 2,
      })
      .setOrigin(0.5, 0.5);
    this.howControl.name = 'howControl';

    this.add(this.howControl);

    this.howPlaySettings = scene.add
      .text(
        40,
        -40,
        '1 - Collect coins\n2 - Jump to the islets\n3 - Avoid falling into water and touching enemies, otherwise death\n4 - Enemy can be killed by jumping on it\n5 - Collect coins from killed enemies\n6 - Get to the finish to pass the level!',
        {
          fontFamily: 'Itim',
          fontSize: '24px',
          color: '#000',
          stroke: '#600808',
          strokeThickness: 1,
        }
      )
      .setOrigin(0.5, 0.5);
    this.howPlaySettings.name = 'howPlaySettings';

    this.add(this.howPlaySettings);
    this.closeButton = scene.add
      .image(466, -340, 'closeBtn')
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
