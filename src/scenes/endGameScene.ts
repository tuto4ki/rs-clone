import { HEIGHT_GAME, WIDTH_GAME } from '../game/constGame';

export default class EndGameScene {
  create(scene: Phaser.Scene, text: string): void {
    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
    scene.add.rectangle(screenCenterX, screenCenterY, WIDTH_GAME / 2 - 150, HEIGHT_GAME / 2 - 200, 0xff00ff);
    scene.add.text(screenCenterX, screenCenterY, text).setOrigin(0.5);
  }
}
