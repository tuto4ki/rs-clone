import ChaseEnemy from './chaseEnemy';
import { EMPTY_PICTURE_HEIGHT, EMPTY_PICTURE_WIDTH, SCALE_SIZE_WORLD } from './constGame';
import Enemy from './enemy';
import IAnimationKey from './type';

const IZombieGirlAnimation = {
  walk: 'walkZombie',
  dead: 'deadZombie',
  run: 'runZombie',
  scale: 0.2,
  bodySize: { width: 200, height: 360 },
};

const IZombieManAnimation = {
  walk: 'walkZombieMan',
  dead: 'deadZombieMan',
  run: 'runZombieMan',
  scale: 0.7,
  bodySize: { width: 60, height: 130 },
};

export default class Enemies {
  private _listEnemies: Enemy[];
  private _listSpriteEntites: Phaser.Physics.Arcade.Group;
  private _listBarrier: Phaser.Physics.Arcade.StaticGroup;
  constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap, type: string) {
    this._listEnemies = [];
    this._listSpriteEntites = scene.physics.add.group();
    this._listBarrier = scene.physics.add.staticGroup();
    console.log(map);
    this.createEnemyList(map, scene, IZombieGirlAnimation, type, 'zombie', 'zombieGirl');
    this.createEnemyList(map, scene, IZombieManAnimation, type, 'zombieMan', 'zombieMan');
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
    scene.physics.add.collider(
      this._listSpriteEntites,
      this._listBarrier,
      this.changeDirection.bind(this),
      undefined,
      scene
    );
  }

  private createEnemyList(
    map: Phaser.Tilemaps.Tilemap,
    scene: Phaser.Scene,
    iAnim: IAnimationKey,
    type: string,
    typeEnemy: string,
    picture: string
  ) {
    const zombieList = map.filterObjects(type, (value) => value.name === typeEnemy);
    zombieList.forEach((object) => {
      if (object.x && object.y) {
        let item: Enemy;
        if (typeEnemy === 'zombieMan') {
          item = new ChaseEnemy(scene, object.x * SCALE_SIZE_WORLD, object.y * SCALE_SIZE_WORLD, picture, iAnim);
        } else {
          item = new Enemy(scene, object.x * SCALE_SIZE_WORLD, object.y * SCALE_SIZE_WORLD, picture, iAnim);
        }
        this._listSpriteEntites.add(item.sprite);
        this._listEnemies.push(item);
      }
    });
  }

  private changeDirection(
    entity: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    barrier: Phaser.Types.Physics.Arcade.GameObjectWithBody
  ) {
    const entityObj: Enemy | undefined = this._listEnemies.find((value) => value.sprite === entity);
    if (entityObj?.isChangeDirection(barrier)) {
      entityObj.changeDirection();
    }
  }

  get listEnemies(): Phaser.Physics.Arcade.Group {
    return this._listSpriteEntites;
  }

  public update(xPos = 0, yPos = 0): void {
    this._listEnemies.forEach((entity) => {
      entity.update(xPos, yPos);
    });
  }

  public destroyEntity(entity: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
    const entityIndex: number = this._listEnemies.findIndex((value) => value.sprite === entity);
    if (entityIndex >= 0) {
      this._listEnemies[entityIndex].deadEnemy();
      this._listEnemies.splice(entityIndex, 1);
    }
  }
}
