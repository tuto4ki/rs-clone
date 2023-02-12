import StateAnimation from './stateAnimationPlayer/stateAnimation';
import { HEIGHT_PLAYER, MASS_PLAYER, SCALE_SIZE_PLAYER, WIDTH_PLAYER } from './constGame';
import IdleAnimation from './stateAnimationPlayer/idleAnimation';
import DeadAnimation from './stateAnimationPlayer/deadAnimation';
import JumpAnimation from './stateAnimationPlayer/jumpAnimation';

export default class Player {
  private _sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _stateAnimation: StateAnimation;
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    this._sprite = scene.physics.add.sprite(x, y, key);
    this._sprite.name = key;
    this._sprite
      .setScale(SCALE_SIZE_PLAYER)
      .setBodySize(WIDTH_PLAYER, HEIGHT_PLAYER)
      .setMass(MASS_PLAYER)
      .refreshBody();
    this._sprite.setCollideWorldBounds(true);
    this._stateAnimation = new IdleAnimation(this);
  }

  public changeState(state: StateAnimation): void {
    if (!state) {
      return;
    }
    this._stateAnimation = state;
  }

  get sprite(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this._sprite;
  }

  public moveUp(): void {
    this._stateAnimation.jump();
  }

  public moveDown(): void {
    this._stateAnimation.onExit();
  }

  public moveLeft(): void {
    this._stateAnimation.moveLeft();
  }

  public moveRight(): void {
    this._stateAnimation.moveRight();
  }

  public deadPlayer(): void {
    this._sprite.body.stop();
    this.changeState(new DeadAnimation(this));
  }

  public deadEnemy(): void {
    this.changeState(new JumpAnimation(this));
  }

  public gameOver(): void {
    this._stateAnimation.onExit();
  }
}
