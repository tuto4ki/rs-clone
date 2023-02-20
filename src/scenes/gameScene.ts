import hotkeys from 'hotkeys-js';
import {
  COLLISION_PLAYER_ENEMY,
  IMAGES,
  MONEY,
  MONEY_SCORE,
  PLAYER_TYPE,
  SCALE_SIZE_WORLD,
  EMUSIC,
  ESCENE,
  GEAR_BTN,
  HELP_BTN,
  EGAME_MAP,
  EGAME_SETTINGS,
} from '../game/constGame';
import Enemies from '../game/enemies/enemies';
import Money from '../game/money';
import Music from '../game/music';
import Obstacles from '../game/obstacle';
import Player from '../game/player';
import Statistics from '../game/statistict';
import { IPassScene } from '../game/type';
// import EndGameScene from './endGameScene';
const END_GAME_TIMEOUT = 1500;

document.addEventListener('keydown', function (event) {
  if (event.key === 'F1' || event.key === 'F2') {
    event.preventDefault();
  }
});
export default class GameScene extends Phaser.Scene {
  private _cursor: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private _player: Player | null = null;
  private _enemies: Enemies | null = null;
  private _isFinish = false;
  private _levelNumber: number;
  private _statistics: Statistics | null = null;
  private _music: Music;
  private _playerType = PLAYER_TYPE.fox;
  private soundMuted = false;
  private previousVolume: number | undefined;

  constructor() {
    super(ESCENE.game);
    this._levelNumber = 1;
    this._music = new Music(this);
  }

  public init(data: IPassScene): void {
    if (data.playerType) {
      this._playerType = data.playerType;
    }
    if (data.isLevelNext) {
      this._levelNumber++;
    }
    this._isFinish = false;
  }

  public create(): void {
    // create music
    this._music.create();
    // load level 1
    const map = this.make.tilemap({ key: `${EGAME_MAP.levelMap}${this._levelNumber}`, tileWidth: 64, tileHeight: 64 });
    const widthWorld = map.widthInPixels * SCALE_SIZE_WORLD;
    // create background
    let xPosBg = 0;
    while (xPosBg <= widthWorld) {
      const img = this.add.image(xPosBg, 0, `${IMAGES.bgLevel}${this._levelNumber}`).setOrigin(0, 0);
      xPosBg = img.x + img.width;
    }
    const waterObj = new Obstacles(this, map, EGAME_MAP.waterObj);
    const stumpObj = new Obstacles(this, map, EGAME_MAP.stumpObj);
    const plateObj = new Obstacles(this, map, EGAME_MAP.endGame, IMAGES.plate);
    const tileset = map.addTilesetImage(
      `${EGAME_MAP.level}${this._levelNumber}`,
      `${EGAME_MAP.levelTiles}${this._levelNumber}`
    );
    const ground = map.createLayer(EGAME_MAP.ground, tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    map.createLayer(EGAME_MAP.background, tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    map.createLayer(EGAME_MAP.water, tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    this.physics.world.setBounds(0, 0, widthWorld, +this.game.config.height);
    this._cursor = this.input.keyboard.createCursorKeys();
    // create player
    this._player = new Player(this, 100, 480, this._playerType);
    this.physics.add.collider(ground, this._player.sprite);
    ground.setCollisionBetween(0, 31);
    // create enemies
    this._enemies = new Enemies(this, map, EGAME_MAP.entityObj);
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
    this.cameras.main.startFollow(this._player.sprite, true, 0.1);
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
    //settings modal
    const gearBtn = this.add.image(977, 71, GEAR_BTN).setInteractive({ useHandCursor: true }).setScale(0.47);
    gearBtn.scrollFactorX = 0;
    gearBtn.name = 'gearBtn';
    gearBtn.scrollFactorX = 0;
    const helpBtn = this.add.image(976, 29, HELP_BTN).setInteractive({ useHandCursor: true }).setScale(0.25);
    helpBtn.name = 'helpBtn';
    helpBtn.scrollFactorX = 0;
    gearBtn.on('pointerdown', this.changeScene.bind(this, ESCENE.settings), this);
    helpBtn.on('pointerdown', this.changeScene.bind(this, ESCENE.help), this);
    this.events.on('resume', () => {
      this._statistics?.play();
      this._music.play(EMUSIC.soundBg);
    });
    hotkeys('f1', () => {
      this.changeScene(ESCENE.help);
    });
    hotkeys('f2', () => {
      this.changeScene(ESCENE.settings);
    });
    hotkeys('m', () => {
      if (!this.soundMuted) {
        // Включаем звук и устанавливаем предыдущую громкость
        this.soundMuted = true;
        this._music.mute();
      } else {
        this.soundMuted = false;
        // Выключаем звук и сохраняем текущую громкость
        this._music.unMute();
      }
    });
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
    setTimeout(() => {
      this.changeScene(ESCENE.end, isDied);
    }, END_GAME_TIMEOUT);
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

  private changeScene(nameScene: string, isDied?: boolean) {
    this._music.stop(EMUSIC.soundBg);
    this._statistics?.pause();
    this.scene.pause();
    this.scene.run(nameScene, { scene: ESCENE.game, isDied, isLevelNext: this._levelNumber < EGAME_SETTINGS.maxLevel });
  }
}
