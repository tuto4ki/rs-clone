import { EGAME_MAP, EMPTY_PICTURE, ESCENE, IMAGES, PLAYER_TYPE, SCALE_SIZE_WORLD } from '../game/constGame';
import Player from '../game/player';
import { IPassScene } from '../game/type';

const TIMEOUT = 500;
const POS_PLAYER = {
  x: 100,
  y: 540,
};
const POS_TUNNEL = {
  first: { x: 800, y: 584 },
  second: { x: 1176, y: 585 },
};

export default class TunnelScene extends Phaser.Scene {
  private _playerType = PLAYER_TYPE.fox;
  private _player: Player | null = null;

  constructor() {
    super(ESCENE.tunnel);
  }

  public create(): void {
    this.add.image(0, 0, `${IMAGES.bgLevel}1`).setOrigin(0, 0);
    const map = this.make.tilemap({
      key: `${EGAME_MAP.levelMap}1-2`,
      tileWidth: +EGAME_MAP.width,
      tileHeight: +EGAME_MAP.height,
    });
    this.add.image(POS_TUNNEL.first.x, POS_TUNNEL.first.y, `${IMAGES.tunnel}1`).setOrigin(1);
    const tileset = map.addTilesetImage(`${EGAME_MAP.level}1`, `${EGAME_MAP.levelTiles}1`);
    const ground = map.createLayer(EGAME_MAP.ground, tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    map.createLayer(EGAME_MAP.background, tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    map.createLayer(EGAME_MAP.water, tileset, 0, 0).setScale(SCALE_SIZE_WORLD);
    this._player = new Player(this, POS_PLAYER.x, POS_PLAYER.y, this._playerType);
    this.add.image(POS_TUNNEL.second.x, POS_TUNNEL.second.y, `${IMAGES.tunnel}2`).setOrigin(1);
    this.physics.add.collider(ground, this._player.sprite);
    setTimeout(() => {
      if (this._player) {
        this._player.moveRight();
      }
    }, TIMEOUT);
    const tunnelObj = map.getObjectLayer('tunnel')['objects'][0];
    const tunnel = this.physics.add.staticGroup();
    if (tunnelObj.x && tunnelObj.y && tunnelObj.width && tunnelObj.height) {
      const pic = tunnel.create(tunnelObj.x * SCALE_SIZE_WORLD, tunnelObj.y * SCALE_SIZE_WORLD, IMAGES.emptyPicture);
      pic.body.width = tunnelObj.width * SCALE_SIZE_WORLD;
      pic.body.height = tunnelObj.height * SCALE_SIZE_WORLD;
      pic
        .setScale(pic.body.width / EMPTY_PICTURE, pic.body.height / EMPTY_PICTURE)
        .setOrigin(0)
        .refreshBody();
    }
    this.physics.add.collider(this._player.sprite, tunnel, () => this.playerCollision());
    ground.setCollisionBetween(0, 31);
  }

  private playerCollision() {
    if (this._player) {
      this._player.sprite.destroy(true);
    }
    this.scene.start(ESCENE.game, { scene: ESCENE.tunnel, isLevelNext: true });
  }

  public init(data: IPassScene): void {
    if (data.playerType) {
      this._playerType = data.playerType;
    }
  }
}
