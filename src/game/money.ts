import { MONEY, SCALE_SIZE_WORLD } from './constGame';

export class Money {
  private _listMoney: Phaser.Physics.Arcade.StaticGroup;

  constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap, type: string) {
    this._listMoney = scene.physics.add.staticGroup();
    const listMoney = map.getObjectLayer(type)['objects'];
    listMoney.forEach((object) => {
      if (object.x && object.y) {
        const money = this._listMoney
          .create(object.x * SCALE_SIZE_WORLD, object.y * SCALE_SIZE_WORLD, MONEY)
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
