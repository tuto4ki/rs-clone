import StateAnimation from './stateAnimationPlayer/stateAnimation';
import { HEIGHT_PLAYER, MASS_PLAYER, SCALE_SIZE_PLAYER, WIDTH_PLAYER } from './constGame';
import IdleAnimation from './stateAnimationPlayer/idleAnimation';
import DeadAnimation from './stateAnimationPlayer/deadAnimation';

export default class Player {
  private _sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _stateAnimation: StateAnimation;
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    this._sprite = scene.physics.add.sprite(x, y, key);
    this._sprite.name = 'player';
    this.createAnimation(scene);
    this._sprite.setCollideWorldBounds(true);
    this._stateAnimation = new IdleAnimation(this);
  }

  changeState(state: StateAnimation): void {
    if (!state) {
      return;
    }
    this._stateAnimation = state;
  }

  createAnimation(scene: Phaser.Scene): void {
    // animation run
    scene.anims.create({
      key: 'runPlayer',
      frames: scene.anims.generateFrameNames('fox', { prefix: 'Run_', start: 1, end: 8, zeroPad: 2 }),
      repeat: -1,
    });
    this._sprite
      .setScale(SCALE_SIZE_PLAYER)
      .setBodySize(WIDTH_PLAYER, HEIGHT_PLAYER)
      .setMass(MASS_PLAYER)
      .refreshBody();
    // animation jump
    scene.anims.create({
      key: 'jumpPlayer',
      frames: scene.anims.generateFrameNames('fox', { prefix: 'Jump_', start: 1, end: 8, zeroPad: 2 }),
      repeat: 0,
    });
    this._sprite
      .setScale(SCALE_SIZE_PLAYER)
      .setBodySize(WIDTH_PLAYER, HEIGHT_PLAYER)
      .setMass(MASS_PLAYER)
      .refreshBody();
    // animation stay
    scene.anims.create({
      key: 'stayPlayer',
      frames: scene.anims.generateFrameNames('fox', { prefix: 'Idle_', start: 1, end: 10, zeroPad: 2 }),
      repeat: -1,
    });
    this._sprite
      .setScale(SCALE_SIZE_PLAYER)
      .setBodySize(WIDTH_PLAYER, HEIGHT_PLAYER)
      .setMass(MASS_PLAYER)
      .refreshBody();
    // animation died
    scene.anims.create({
      key: 'deadPlayer',
      frames: scene.anims.generateFrameNames('fox', { prefix: 'Dead_', start: 1, end: 10, zeroPad: 2 }),
      repeat: 0,
    });
    this._sprite
      .setScale(SCALE_SIZE_PLAYER)
      .setBodySize(WIDTH_PLAYER, HEIGHT_PLAYER)
      .setMass(MASS_PLAYER)
      .refreshBody();
  }

  get sprite(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this._sprite;
  }

  moveUp(): void {
    this._stateAnimation.jump();
  }

  moveDown(): void {
    this._stateAnimation.onExit();
  }

  moveLeft(): void {
    this._stateAnimation.moveLeft();
  }

  moveRight(): void {
    this._stateAnimation.moveRight();
  }

  deadPlayer(): void {
    this.changeState(new DeadAnimation(this));
  }

  gameOver(): void {
    this._stateAnimation.onExit();
  }
}
