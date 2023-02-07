import { GameScene } from '../../scenes/gameScene';
import { EMPTY_PICTURE_HEIGHT, EMPTY_PICTURE_WIDTH, SCALE_SIZE_WORLD } from '../constGame';

export default class Obstacles {
  fakeObjects: Phaser.Physics.Arcade.StaticGroup;
  constructor(scene: GameScene, map: Phaser.Tilemaps.Tilemap, type: string) {
    this.fakeObjects = scene.physics.add.staticGroup();
    const tiledObj = map.getObjectLayer(type)['objects'];
    tiledObj.forEach((object) => {
      if (object.x && object.y && object.width && object.height) {
        const obj = this.fakeObjects
          .create(object.x * SCALE_SIZE_WORLD, object.y * SCALE_SIZE_WORLD, 'emptyPicture')
          .setOrigin(0, 0);
        obj.body.width = object.width * SCALE_SIZE_WORLD;
        obj.body.height = object.height * SCALE_SIZE_WORLD;
        obj
          .setScale(obj.body.width / EMPTY_PICTURE_WIDTH, obj.body.height / EMPTY_PICTURE_HEIGHT)
          .setBodySize(object.width * SCALE_SIZE_WORLD, object.height * SCALE_SIZE_WORLD)
          .refreshBody();
      }
    });
  }

  addPhysics(scene: GameScene) {
    if (scene.player) {
      scene.physics.add.collider(scene.player?.sprite, this.fakeObjects);
    }
  }
}
