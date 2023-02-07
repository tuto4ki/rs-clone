import { GameScene } from '../../scenes/gameScene';
import Obstacles from './obstacle';

export default class Stump extends Obstacles {
  constructor(scene: GameScene, map: Phaser.Tilemaps.Tilemap, type: string) {
    super(scene, map, type);
    this.addPhysics(scene);
  }
}
