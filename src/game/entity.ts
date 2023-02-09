import { MASS_PLAYER, SCALE_SIZE_PLAYER, SPEED_ENTITY } from './constGame';
export default class Entity {
  private _sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _directionEntity = 1;
  private _barrierCollision: Phaser.Types.Physics.Arcade.GameObjectWithBody | null;
  constructor(scene: Phaser.Scene, x: number, y: number, key: string /* , type: string */) {
    this._barrierCollision = null;
    this._sprite = scene.physics.add.sprite(x, y, key);
    this._sprite.name = 'zombieGirl';
    this._sprite.setScale(SCALE_SIZE_PLAYER).setMass(MASS_PLAYER).refreshBody();
    this._sprite.setData('isDead', false);
    this._sprite.setCollideWorldBounds(true);
    this._sprite.play('walkZombie');
  }

  public update(): void {
    if (!this._sprite.getData('isDead')) {
      this._sprite.body.setVelocityX(this._directionEntity * SPEED_ENTITY);
    }
  }

  public changeDirection() {
    this._directionEntity *= -1;
    this._sprite
      .setScale(this._directionEntity * SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER)
      .setOffset(this._directionEntity < 0 ? this._sprite.width : 0, 0);
  }

  public isChangeDirection(barrier: Phaser.Types.Physics.Arcade.GameObjectWithBody): boolean {
    if (barrier === this._barrierCollision) {
      return false;
    }
    this._sprite
      .setScale(this._directionEntity * SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER)
      .refreshBody()
      .body.setVelocityX(this._directionEntity * SPEED_ENTITY);
    this._barrierCollision = barrier;
    return true;
  }

  get sprite(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this._sprite;
  }

  public deadEntity() {
    this._sprite.setData('isDead', true);
    this._sprite.scene.physics.world.remove(this._sprite.body);
    this._sprite.play('deadZombie');
    this._sprite.on('animationcomplete-deadZombie', () => {
      setTimeout(() => {
        this._sprite.destroy();
      }, 1000);
    });
  }
}
