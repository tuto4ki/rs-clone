import { MASS_PLAYER, SPEED_ENTITY } from './constGame';
import IAnimationKey from './type';

export default class Entity {
  private _sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _directionEntity = 1;
  private _barrierCollision: Phaser.Types.Physics.Arcade.GameObjectWithBody | null;
  private _animationKey: IAnimationKey;

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

  public update(): void {
    if (!this._sprite.getData('isDead')) {
      this._sprite.body.setVelocityX(this._directionEntity * SPEED_ENTITY);
    }
  }

  public changeDirection() {
    this._directionEntity *= -1;
    // const dw = this._sprite.displayWidth / 2;
    console.log(this._sprite.displayWidth, this._sprite.body.halfWidth, this._animationKey.bodySize.width);
    // const dh = this._sprite.displayHeight / 2;
    // dw - this.sprite.body.halfWidth, dh - this._sprite.body.halfHeight
    this._sprite
      .setScale(this._directionEntity * this._animationKey.scale, this._animationKey.scale)
      .setBodySize(this._animationKey.bodySize.width, this._animationKey.bodySize.height, true)
      .setOffset(this._directionEntity < 0 ? this._animationKey.bodySize.width : 0, 0)
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

  public deadEntity() {
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
