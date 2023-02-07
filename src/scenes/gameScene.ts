import Modal from '../components/modal/modal';
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
    const gear = this.add.image(25, 25, 'gear').setInteractive().setScale(0.4);
    gear.name = 'gear';
    const modal = new Modal(this, 400, 300, 300, 200);
    this.add.existing(modal);
    gear.on('pointerdown', () => {
      if (!modal.isOpen) {
        modal.open();
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
