import { GameScene } from '../../scenes/gameScene';
import Player from '../player';
import Obstacles from './obstacle';

export default class Plate extends Obstacles {
  constructor(scene: GameScene, map: Phaser.Tilemaps.Tilemap, type: string, picture: string) {
    super(scene, map, type, picture);
  }

  addPhysics(scene: GameScene, player: Player) {
    scene.physics.add.overlap(player.sprite, this.fakeObjects, this.gameOver.bind(this, scene), undefined, scene);
  }

  gameOver(scene: GameScene) {
    if (!scene.isFinish) {
      scene.player?.gameOver();
      scene.gameOver(false);
    }
  }
}
