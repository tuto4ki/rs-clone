import * as Phaser from 'phaser';
import { WIDTH_GAME, HEIGHT_GAME, GRAVITY, GAME_BACKGROUND } from '../../game/constGame';
import EndGameScene from '../../scenes/endGameScene';
import GameScene from '../../scenes/gameScene';
import HelpScene from '../../scenes/helpScene';
import PreloadScene from '../../scenes/preloadScene';
import SettingsScene from '../../scenes/settingsScene';
import StartScene from '../../scenes/startScene';
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
      fps: {
        target: 60,
        forceSetTimeOut: true,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: GRAVITY,
          },
          debug: true,
        },
      },
      backgroundColor: GAME_BACKGROUND,
      scene: [PreloadScene, GameScene, StartScene, SettingsScene, HelpScene, EndGameScene],
    });
  }
}
