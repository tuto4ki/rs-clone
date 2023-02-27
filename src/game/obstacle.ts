import GameScene from '../scenes/gameScene';
import { EMPTY_PICTURE, IMAGES, SCALE_SIZE_WORLD } from './constGame';
import Player from './player';

export default class Obstacles {
  fakeObjects: Phaser.Physics.Arcade.StaticGroup;
  constructor(
    scene: GameScene,
    map: Phaser.Tilemaps.Tilemap,
    type: string,
    pictureDefault: string = IMAGES.emptyPicture
  ) {
    this.fakeObjects = scene.physics.add.staticGroup();
    if (map.getObjectLayer(type)) {
      const tiledObj = map.getObjectLayer(type)['objects'];
      tiledObj.forEach((object) => {
        if (object.x && object.y && object.width && object.height) {
          const obj = this.fakeObjects.create(object.x * SCALE_SIZE_WORLD, object.y * SCALE_SIZE_WORLD, pictureDefault);
          obj.body.width = object.width * SCALE_SIZE_WORLD;
          obj.body.height = object.height * SCALE_SIZE_WORLD;
          if (pictureDefault === IMAGES.emptyPicture) {
            obj.setScale(obj.body.width / EMPTY_PICTURE, obj.body.height / EMPTY_PICTURE).setOrigin(0);
          } else {
            obj.setOrigin(1);
          }
          obj.setBodySize(obj.body.width, obj.body.height).refreshBody();
        }
      });
    }
  }

  addPhysics(scene: GameScene, player: Player) {
    scene.physics.add.collider(player.sprite, this.fakeObjects);
  }

  addPhysicsCallBack(scene: GameScene, player: Player, callback: () => void): void {
    scene.physics.add.overlap(player.sprite, this.fakeObjects, callback);
  }
}
