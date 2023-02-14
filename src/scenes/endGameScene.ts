import { ESCENE, HEIGHT_GAME, WIDTH_GAME } from '../game/constGame';

export default class EndGameScene extends Phaser.Scene {
  _text = 'end game';

  constructor() {
    super(ESCENE.end);
  }

  public create(): void {
    console.log('endGameScene');
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.rectangle(screenCenterX, screenCenterY, WIDTH_GAME / 2 - 150, HEIGHT_GAME / 2 - 200, 0xff00f);
    this.add.text(screenCenterX, screenCenterY, this._text).setOrigin(0.5);
  }
}
