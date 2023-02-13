import {
  COLLISION_PLAYER_ENEMY,
  EMUSIC,
  IMAGES,
  MONEY,
  MONEY_SCORE,
  PLAYER_TYPE,
  SCALE_SIZE_WORLD,
} from '../game/constGame';
import Enemies from '../game/enemies/enemies';
import Money from '../game/money';
import Music from '../game/music';
import Obstacles from '../game/obstacle';
import Player from '../game/player';
import Statistics from '../game/statistict';
import EndGameScene from './endGameScene';

export class GameScene extends Phaser.Scene {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private _player: Player | null = null;
  private _enemies: Enemies | null = null;
  private _isFinish: boolean;
  private _levelNumber: number;
  private _statistics: Statistics | null = null;
  private _music: Music;
  constructor() {
    super('Game');
    this._isFinish = false;
    this._levelNumber = 1;
    this._music = new Music(this);
  }

  public create(): void {
    // create music
    this._music.create();
    // load level 1
    const map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
    const widthWorld = map.widthInPixels * SCALE_SIZE_WORLD;
    // create background
    for (let n = 0; n < widthWorld / +this.game.config.width; n += 1) {
      this.add.image(+this.game.config.width * n, 0, IMAGES.bgLevel1).setOrigin(0, 0);
    }
    const waterObj = new Obstacles(this, map, 'waterObj');
    const stumpObj = new Obstacles(this, map, 'stumpObj');
    const plateObj = new Obstacles(this, map, 'endGame', IMAGES.plate);
    const tileset = map.addTilesetImage('freeTiles', 'tiles');
    const ground = map.createLayer('ground', tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    map.createLayer('background', tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    map.createLayer('water', tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    this.physics.world.setBounds(0, 0, widthWorld, +this.game.config.height);
    this._cursor = this.input.keyboard.createCursorKeys();
    // create player
    this._player = new Player(this, 100, 480, PLAYER_TYPE.fox);
    this.physics.add.collider(ground, this._player.sprite);
    ground.setCollisionBetween(0, 31);
    // create enemies
    this._enemies = new Enemies(this, map, 'entityObj');
    this.physics.add.collider(ground, this._enemies.listEnemies);
    this.physics.add.collider(this._player?.sprite, this._enemies.listEnemies, this.checkCollision.bind(this)).name =
      COLLISION_PLAYER_ENEMY;
    // create money
    const moneyObj = new Money(this, map, `${MONEY}Obj`);
    // control player
    this._cursor?.up.on('down', this.cursorDown.bind(this));
    this._cursor?.space.on('down', this.cursorDown.bind(this));
    // camera
    this.cameras.main.setBounds(0, 0, widthWorld, +this.game.config.height);
    this.cameras.main.startFollow(this._player.sprite, true);
    // collision with player
    if (this.player) {
      waterObj.addPhysicsCallBack(this, this.player, () => {
        if (!this.isFinish) {
          this._music.stop(EMUSIC.soundBg);
          this._music.play(EMUSIC.diePlayer);
          this.player?.deadPlayer();
          this.gameOver(true);
        }
      });
      stumpObj.addPhysics(this, this.player);
      plateObj.addPhysicsCallBack(this, this.player, () => {
        if (!this.isFinish) {
          this._music.stop(EMUSIC.soundBg);
          this._music.play(EMUSIC.win);
          this.player?.gameOver();
          this.gameOver(false);
        }
      });

      this.physics.add.overlap(this.player.sprite, moneyObj.listMoney, this.checkCollisionMoney.bind(this));
    }
    // score and time
    this._statistics = new Statistics(this, 30, 30);
  }

  public update(): void {
    if (this._isFinish) {
      this._enemies?.update(0, 0);
      return;
    }
    this._enemies?.update(this._player?.sprite.x, this._player?.sprite.y);
    if (this._cursor && this._player) {
      if (this._cursor.left.isDown) {
        this._player.moveLeft();
      } else if (this._cursor.right.isDown) {
        this._player.moveRight();
      } else if (this._player.sprite.body.onFloor()) {
        this._player.moveDown();
      }
    }
    this._statistics?.update();
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

  public gameOver(isDied: boolean) {
    this._isFinish = true;
    const endGame = new EndGameScene();
    endGame.create(this, isDied ? 'You Died' : 'You Win!');
  }

  private checkCollision(
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ): void {
    if (enemy.getData('isDead') || this._isFinish) {
      return;
    }
    if (Math.ceil(enemy.body.top) >= Math.ceil(player.body.bottom)) {
      this._music.play(EMUSIC.dieEnemy);
      this._player?.deadEnemy();
      if (this._statistics) {
        this._statistics.score += this._enemies ? this._enemies.destroyEntity(enemy) : 0;
      }
    } else {
      this._music.stop(EMUSIC.soundBg);
      this._music.play(EMUSIC.diePlayer);
      player.removeInteractive();
      player.removeAllListeners();
      this.physics.world.colliders
        .getActive()
        .find((collision) => collision.name == COLLISION_PLAYER_ENEMY)
        ?.destroy();
      this._player?.deadPlayer();
      this.gameOver(true);
    }
  }

  private checkCollisionMoney(
    money: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    if (this._statistics) {
      this._statistics.score += MONEY_SCORE;
    }
    if (money.name === MONEY) {
      money.destroy();
    } else {
      player.destroy();
    }
    this._music.play(EMUSIC.coin);
  }

  private cursorDown() {
    this._music.play(EMUSIC.jump);
    this._player?.moveUp();
  }
}
