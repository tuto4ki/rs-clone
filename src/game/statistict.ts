import { MONEY } from './constGame';

enum Styles {
  color = '#008080',
  font = 'Arial',
  size = '36',
}

const POS_TEXT = 40;

const POS_TIME = 300;

const MILLISECONDS = 1000;

export default class Statistics {
  private _score = 0;
  private _scoreSprite: Phaser.GameObjects.Text;
  private _time = 0;
  private _timeSprite: Phaser.GameObjects.Text;
  private _startTime: Date;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    scene.add.sprite(x, y, MONEY).setOrigin(0).scrollFactorX = 0;
    this._scoreSprite = scene.add
      .text(x + POS_TEXT, y, this._score.toString(), {
        font: `${Styles.size}px ${Styles.font}`,
        color: Styles.color,
      })
      .setOrigin(0);
    this._scoreSprite.scrollFactorX = 0;
    this._timeSprite = scene.add
      .text(x + POS_TIME, y, this._time.toString(), {
        font: `${Styles.size}px ${Styles.font}`,
        color: Styles.color,
      })
      .setOrigin(0);
    this._timeSprite.scrollFactorX = 0;
    this._startTime = new Date();
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
    this._scoreSprite.setText(this._score.toString());
  }

  public update() {
    const currentTime = new Date();
    this._time = Math.floor((currentTime.getTime() - this._startTime.getTime()) / MILLISECONDS);
    this._timeSprite.setText(this._time.toString());
  }
}
