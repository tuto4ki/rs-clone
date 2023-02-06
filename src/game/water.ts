import { GameScene } from '../scenes/gameScene';
import { EMPTY_PICTURE_HEIGHT, EMPTY_PICTURE_WIDTH, SCALE_SIZE_WORLD } from './constGame';

export default class Water {
  constructor(scene: GameScene, map: Phaser.Tilemaps.Tilemap) {
    const fakeObjects = scene.physics.add.staticGroup();
    const waterObjects = map.getObjectLayer('waterObj')['objects'];
    waterObjects.forEach((object) => {
      if (object.x && object.y && object.width && object.height) {
        const obj = fakeObjects
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
    if (scene.player) {
      scene.physics.add.overlap(scene.player?.sprite, fakeObjects, this.playerDead.bind(this, scene), undefined, scene);
    }
  }

  private playerDead(scene: GameScene) {
    if (!scene.isFinish) {
      scene.player?.deadPlayer();
      scene.isFinish = true;
    }
  }
}
