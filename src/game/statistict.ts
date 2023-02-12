enum Styles {
  color = '#008080',
  font = 'Arial',
  size = '52',
}

const POSITION_PANEL_Y = 50;

export default class Statistics extends Phaser.GameObjects.Layer {
  private _score = 0;
  private _scoreSprite: Phaser.GameObjects.Text | null = null;
  // private _time = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, children: Phaser.GameObjects.GameObject[]) {
    super(scene, children);
    // ...
    scene.add.existing(this);
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  public create(scene: Phaser.Scene): void {
    this._scoreSprite = new Phaser.GameObjects.Text(
      scene,
      scene.cameras.main.centerX,
      POSITION_PANEL_Y,
      this._score.toString(),
      {
        font: `${Styles.size}px ${Styles.font}`,
        color: Styles.color,
      }
    );
    scene.add.layer(this._scoreSprite);
  }

  public preUpdate(): void {
    if (this._scoreSprite) {
      this._scoreSprite.text = this._score.toString();
      /*
      this._scoreSprite.setPosition(
        this._scoreSprite.scene.cameras.main.worldView.x + this._scoreSprite?.scene.cameras.main.width / 2,
        POSITION_PANEL_Y
      );
      */
    }
  }
}
