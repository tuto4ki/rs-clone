import * as Phaser from 'phaser';
import { GRAVITY, GAME_BACKGROUND, EGAME_SETTINGS } from '../../game/constGame';
import EndGameScene from '../../scenes/endGameScene';
import GameScene from '../../scenes/gameScene';
import HelpScene from '../../scenes/helpScene';
import PreloadScene from '../../scenes/preloadScene';
import SettingsScene from '../../scenes/settingsScene';
import StartScene from '../../scenes/startScene';
import TunnelScene from '../../scenes/tunnelScene';
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
      width: EGAME_SETTINGS.width,
      height: EGAME_SETTINGS.height,
      fps: {
        target: 60,
        forceSetTimeOut: false,
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
      scene: [PreloadScene, GameScene, StartScene, SettingsScene, HelpScene, EndGameScene, TunnelScene],
    });
  }
}
