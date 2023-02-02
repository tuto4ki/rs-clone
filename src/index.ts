import * as Phaser from 'phaser';
import { WIDTH_GAME, HEIGHT_GAME } from './constValue';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'minesweeper',
  width: WIDTH_GAME,
  height: HEIGHT_GAME,
  backgroundColor: '#F0FFFF',
  scene: [],
});
export class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }
  public preload(): void {
    console.log('preload');
  }
  public create(): void {
    console.log('create');
  }
}
