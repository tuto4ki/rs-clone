import helpModal from '../components/modal/helpModal';
import Modal from '../components/modal/soundModal';
import { HEIGHT_GAME, WIDTH_GAME } from '../constGame';
export class GameScene extends Phaser.Scene {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private _player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null = null;
  // modal!: Modal;
  // gear!: Phaser.GameObjects.Image;
  constructor() {
    super('Game');
  }

  public create(): void {
    this.add.image(WIDTH_GAME / 2, HEIGHT_GAME / 2, 'bgGame');
    const platforms = this.physics.add.staticGroup();
    const countGround = Math.ceil(WIDTH_GAME / 128);
    platforms.create(400, 500, 'groundMiddle');
    for (let i = 0; i < countGround; i++) {
      platforms.create(i * 128 + 64, HEIGHT_GAME - 64, 'groundMiddle');
    }
    this._cursor = this.input.keyboard.createCursorKeys();
    this._player = this.physics.add.sprite(200, 200, 'player');
    this._player.setScale(0.2).refreshBody();
    this.physics.add.collider(platforms, this._player);
    //settings modal
    const gearBtn = this.add.image(977, 71, 'gearBtn').setInteractive({ useHandCursor: true }).setScale(0.47);
    gearBtn.name = 'gearBtn';
    const helpBtn = this.add.image(976, 29, 'helpBtn').setInteractive({ useHandCursor: true }).setScale(0.25);
    helpBtn.name = 'helpBtn';
    // const playBtn = this.add.image(50, 75, 'playBtn').setInteractive().setScale(0.4);
    // const exitBtn = this.add.image(50, 125, 'exitBtn').setInteractive().setScale(0.4);
    // const homeBtn = this.add.image(50, 225, 'homeBtn').setInteractive().setScale(0.4);
    // const infoBtn = this.add.image(50, 275, 'infoBtn').setInteractive().setScale(0.4);
    // const menuBtn = this.add.image(50, 325, 'menuBtn').setInteractive().setScale(0.4);
    const modal = new Modal(this, WIDTH_GAME / 2, HEIGHT_GAME / 2, 300, 200);
    modal.setScale(0);
    this.add.existing(modal);
    gearBtn.on('pointerdown', () => {
      if (!modal.isOpen) {
        modal.open();
      }
    });
    //
    const howToPlayModal = new helpModal(this, WIDTH_GAME / 2, HEIGHT_GAME / 2, WIDTH_GAME - 60, HEIGHT_GAME - 60);
    howToPlayModal.setScale(0);
    this.add.existing(howToPlayModal);
    helpBtn.on('pointerdown', () => {
      if (!howToPlayModal.isOpen) {
        howToPlayModal.open();
        howToPlayModal.setDepth(1);
      }
    });
  }

  public update(/* time: number, delta: number */): void {
    if (this._cursor && this._player) {
      if (this._cursor.left.isDown) {
        this._player.body.setVelocityX(-200); // move left
      } else if (this._cursor.right.isDown) {
        this._player.body.setVelocityX(200); // move right
      } else if (this._player.body.onFloor()) {
        this._player.body.setVelocityX(0);
      }
      if ((this._cursor.space.isDown || this._cursor.up.isDown) && this._player.body.onFloor()) {
        this._player.body.setVelocityY(-500); // jump up
      }
    }
  }
}
