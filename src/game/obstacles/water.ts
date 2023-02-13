import { GameScene } from '../../scenes/gameScene';
import Player from '../player';
import Obstacles from './obstacle';

export default class Water extends Obstacles {
  constructor(scene: GameScene, map: Phaser.Tilemaps.Tilemap, type: string) {
    super(scene, map, type);
  }

  addPhysics(scene: GameScene, player: Player) {
    scene.physics.add.overlap(player.sprite, this.fakeObjects, this.playerDead.bind(this, scene), undefined, scene);
  }

  private playerDead(scene: GameScene) {
    if (!scene.isFinish) {
      scene.player?.deadPlayer();
      scene.gameOver(true);
    }
  }
}
