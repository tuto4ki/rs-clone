import { GameScene } from '../../scenes/gameScene';
import Obstacles from './obstacle';

export default class Water extends Obstacles {
  constructor(scene: GameScene, map: Phaser.Tilemaps.Tilemap, type: string) {
    super(scene, map, type);
    if (scene.player) {
      scene.physics.add.overlap(
        scene.player?.sprite,
        this.fakeObjects,
        this.playerDead.bind(this, scene),
        undefined,
        scene
      );
    }
  }

  private playerDead(scene: GameScene) {
    if (!scene.isFinish) {
      scene.player?.deadPlayer();
      scene.isFinish = true;
    }
  }
}
