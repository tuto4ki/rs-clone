import * as Phaser from 'phaser';
import { WIDTH_GAME, HEIGHT_GAME, GRAVITY } from './constGame';
import { GameScene } from './scenes/gameScene';
import { StartScene } from './scenes/startScene';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'minesweeper',
  width: WIDTH_GAME,
  height: HEIGHT_GAME,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: GRAVITY,
      },
      debug: false,
    },
  },
  backgroundColor: '#F0FFFF',
  scene: [StartScene, GameScene],
});
