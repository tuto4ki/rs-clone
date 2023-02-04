import { HEIGHT_GAME, WIDTH_GAME } from '../game/constGame';
import Player from '../game/player';

export class GameScene extends Phaser.Scene {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private _player: Player | null = null;
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
    this._player = new Player(this, 100, 580, 'fox');
    this.physics.add.collider(platforms, this._player.sprite);
    this._cursor?.up.on('down', () => this._player?.moveUp());
    this._cursor?.space.on('down', () => this._player?.moveUp());
  }

  public update(/* time: number, delta: number */): void {
    if (this._cursor && this._player) {
      if (this._cursor.left.isDown) {
        this._player.moveLeft();
      } else if (this._cursor.right.isDown) {
        this._player.moveRight();
      } else if (this._player.sprite.body.onFloor()) {
        this._player.moveDown();
      }
    }
  }
}
