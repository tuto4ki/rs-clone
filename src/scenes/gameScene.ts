import { HEIGHT_GAME, SCALE_SIZE_WORLD, WIDTH_GAME } from '../game/constGame';
import Plate from '../game/obstacles/plate';
import Stump from '../game/obstacles/stump';
import Water from '../game/obstacles/water';
import Player from '../game/player';
import EndGameScene from './endGameScene';

export class GameScene extends Phaser.Scene {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private _player: Player | null = null;
  private _isFinish: boolean;
  private _levelNumber: number;
  constructor() {
    super('Game');
    this._isFinish = false;
    this._levelNumber = 1;
  }

  public create(): void {
    // load level 1
    const map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
    const widthWorld = map.widthInPixels * SCALE_SIZE_WORLD;
    // create background
    for (let n = 0; n < widthWorld / WIDTH_GAME; n += 1) {
      this.add.image(WIDTH_GAME * n, 0, 'bgGame').setOrigin(0, 0);
    }
    const waterObj = new Water(this, map, 'waterObj');
    const stumpObj = new Stump(this, map, 'stumpObj');
    const plateObj = new Plate(this, map, 'endGame', 'plate');
    const tileset = map.addTilesetImage('freeTiles', 'tiles');
    const ground = map.createLayer('ground', tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    map.createLayer('background', tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    map.createLayer('water', tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    this.physics.world.setBounds(0, 0, widthWorld, HEIGHT_GAME);
    this._cursor = this.input.keyboard.createCursorKeys();
    this._player = new Player(this, 100, 480, 'fox');
    this.physics.add.collider(ground, this._player.sprite);
    ground.setCollisionBetween(0, 31);
    this._cursor?.up.on('down', () => this._player?.moveUp());
    this._cursor?.space.on('down', () => this._player?.moveUp());
    this.cameras.main.setBounds(0, 0, widthWorld, HEIGHT_GAME);
    this.cameras.main.startFollow(this._player.sprite, true);
    if (this.player) {
      waterObj.addPhysics(this, this.player);
      stumpObj.addPhysics(this, this.player);
      plateObj.addPhysics(this, this.player);
    }
  }

  public update(/* time: number, delta: number */): void {
    if (this._isFinish) {
      return;
    }
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

  get player(): Player | null {
    return this._player;
  }

  get isFinish(): boolean {
    return this._isFinish;
  }

  set isFinish(value: boolean) {
    this._isFinish = value;
  }

  gameOver(isDied: boolean) {
    this._isFinish = true;
    const endGame = new EndGameScene();
    endGame.create(this, isDied ? 'You Died' : 'You Win!');
  }
}
