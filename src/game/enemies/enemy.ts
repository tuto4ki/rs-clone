import { MASS_PLAYER, SPEED_ENTITY } from '../constGame';
import IAnimationKey from '../type';

export default class Enemy {
  protected _sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  protected _directionEnemy = 1;
  private _barrierCollision: Phaser.Types.Physics.Arcade.GameObjectWithBody | null;
  protected _animationKey: IAnimationKey;
  protected _speedRun = 1;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, animationKey: IAnimationKey) {
    this._barrierCollision = null;
    this._sprite = scene.physics.add.sprite(x, y, key);
    this._sprite.name = key;
    this._sprite
      .setScale(animationKey.scale)
      .setOffset(0)
      .setBodySize(animationKey.bodySize.width, animationKey.bodySize.height, true)
      .setMass(MASS_PLAYER)
      .refreshBody();
    this._sprite.setData('isDead', false);
    this._sprite.setCollideWorldBounds(true);
    this._sprite.play(animationKey.walk);
    this._animationKey = animationKey;
  }

  public update(xPos?: number, yPos?: number): void {
    if (!this._sprite.getData('isDead')) {
      xPos = yPos; // this is change
      this._sprite.body.setVelocityX(this._directionEnemy * SPEED_ENTITY * this._speedRun);
    }
  }

  public changeDirection() {
    this._directionEnemy *= -1;
    this._sprite
      .setScale(this._directionEnemy * this._animationKey.scale, this._animationKey.scale)
      .setBodySize(this._animationKey.bodySize.width, this._animationKey.bodySize.height, true)
      .setOffset(this._directionEnemy < 0 ? this._animationKey.bodySize.width : 0, 0)
      .refreshBody();
  }

  public isChangeDirection(barrier: Phaser.Types.Physics.Arcade.GameObjectWithBody): boolean {
    if (barrier === this._barrierCollision) {
      return false;
    }
    this._barrierCollision = barrier;
    return true;
  }

  get sprite(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this._sprite;
  }

  public deadEnemy() {
    this._sprite.setData('isDead', true);
    this._sprite.scene.physics.world.remove(this._sprite.body);
    this._sprite.play(this._animationKey.dead);
    this._sprite.on(`animationcomplete-${this._animationKey.dead}`, () => {
      setTimeout(() => {
        this._sprite.destroy();
      }, 1000);
    });
  }
}
