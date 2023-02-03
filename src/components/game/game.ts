import * as Phaser from 'phaser';
import { WIDTH_GAME, HEIGHT_GAME, GRAVITY } from '../../constGame';
import { GameScene } from '../../scenes/gameScene';
import { StartScene } from '../../scenes/startScene';
import './game.scss';

export default class Game {
  createGame(): HTMLElement {
    const main = document.createElement('main');
    main.classList.add('main');
    main.setAttribute('id', 'main');
    return main;
  }

  startGame(): void {
    new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'main',
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
  }
}
