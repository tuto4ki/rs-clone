import { EMPTY_PICTURE_HEIGHT, EMPTY_PICTURE_WIDTH, SCALE_SIZE_WORLD } from './constGame';
import Entity from './entity';

export default class Entities {
  private _listEntities: Entity[];
  private _listSpriteEntites: Phaser.Physics.Arcade.Group;
  private _listBarrier: Phaser.Physics.Arcade.StaticGroup;
  constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap, type: string) {
    this._listEntities = [];
    this._listSpriteEntites = scene.physics.add.group();
    this._listBarrier = scene.physics.add.staticGroup();
    const zombieList = map.filterObjects(type, (value) => value.name === 'zombie');
    zombieList.forEach((object) => {
      if (object.x && object.y) {
        const item = new Entity(scene, object.x * SCALE_SIZE_WORLD, object.y * SCALE_SIZE_WORLD, 'zombieGirl');
        this._listSpriteEntites.add(item.sprite);
        this._listEntities.push(item);
      }
    });
    const barrierList = map.filterObjects(type, (value) => value.name === 'barier');
    barrierList.forEach((object) => {
      if (object.x && object.y && object.width && object.height) {
        const obj = this._listBarrier.create(object.x * SCALE_SIZE_WORLD, object.y * SCALE_SIZE_WORLD, 'emptyPicture');
        obj.body.width = object.width;
        obj.body.height = object.height;
        obj
          .setOrigin(0, 0)
          .setScale(obj.body.width / EMPTY_PICTURE_WIDTH, obj.body.height / EMPTY_PICTURE_HEIGHT)
          .refreshBody();
      }
    });
    scene.physics.add.overlap(
      this._listSpriteEntites,
      this._listBarrier,
      this.changeDirection.bind(this),
      undefined,
      scene
    );
  }

  private changeDirection(
    entity: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    barrier: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    const entityObj: Entity | undefined = this._listEntities.find((value) => value.sprite === entity);
    if (entityObj?.isChangeDirection(barrier)) {
      entityObj.changeDirection();
    }
  }

  get listEntities(): Phaser.Physics.Arcade.Group {
    return this._listSpriteEntites;
  }

  public update(): void {
    this._listEntities.forEach((entity) => {
      entity.update();
    });
  }

  public destroyEntity(entity: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    const entityIndex: number = this._listEntities.findIndex((value) => value.sprite === entity);
    if (entityIndex >= 0) {
      this._listEntities[entityIndex].deadEntity();
      this._listEntities.splice(entityIndex, 1);
    }
  }
}
