import { MONEY, SCALE_SIZE_WORLD } from './constGame';

export default class Money {
  private _listMoney: Phaser.Physics.Arcade.StaticGroup;

  constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap, type: string) {
    this._listMoney = scene.physics.add.staticGroup();
    const listMoney = map.getObjectLayer(type)['objects'];
    listMoney.forEach((object) => {
      if (object.x && object.y) {
        const posX = object.x + (object.width ? object.width / 2 : 0);
        const posY = object.y - (object.height ? object.height / 2 : 0);
        const money = this._listMoney
          .create(posX * SCALE_SIZE_WORLD, posY * SCALE_SIZE_WORLD, MONEY)
          .setOrigin(0.5)
          .play(MONEY);
        money.name = MONEY;
      }
    });
  }

  get listMoney() {
    return this._listMoney;
  }

  public collisionPlayer(money: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    money.destroy();
  }
}
