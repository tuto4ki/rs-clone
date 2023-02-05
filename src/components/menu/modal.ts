export default class Modal extends Phaser.GameObjects.Container {
  background: Phaser.GameObjects.Rectangle;
  header: Phaser.GameObjects.Text;
  content: Phaser.GameObjects.Text;
  closeButton: Phaser.GameObjects.Text;
  isOpen!: boolean;
  // isOpen: boolean;

  constructor(scene: Phaser.Scene, x: number | undefined, y: number | undefined, width: number, height: number) {
    super(scene, x, y);

    this.background = scene.add
      .rectangle(0, 0, width, height, 0x000000, 0.5)
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        // this.close();
      });

    this.add(this.background);

    this.header = scene.add.text(0, -(height / 2) + 20, 'Settings', { fontSize: '24px' }).setOrigin(0.5, 0.5);

    this.add(this.header);

    this.content = scene.add.text(0, 0, 'Modal Content', { fontSize: '18px' }).setOrigin(0.5, 0.5);

    this.add(this.content);

    this.closeButton = scene.add
      .text(0, height / 2 - 20, 'Close', { fontSize: '18px' })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.close();
      });

    this.add(this.closeButton);

    this.setSize(width, height);

    this.setVisible(false);
  }

  open() {
    console.log('open modal');
    this.setVisible(true);
    this.background.setAlpha(0.5);
    this.isOpen = true;
  }

  close() {
    this.setVisible(false);
    this.background.setAlpha(0);
    this.isOpen = false;
  }
}
