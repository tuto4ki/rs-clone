import {
  ENTITY_ANIMATION,
  HEIGHT_PLAYER,
  SCALE_SIZE_PLAYER,
  SPEED_PLAYER,
  SPEED_UP_PLAYER,
  WIDTH_PLAYER,
} from '../constGame';
import Player from '../player';
import IdleAnimation from './idleAnimation';
import MoveLeftAnimation from './moveLeftAnimation';
import MoveRightAnimation from './moveRightAnimation';
import StateAnimation from './stateAnimation';

export default class JumpAnimation extends StateAnimation {
  constructor(player: Player) {
    super(player);
    this.onEnter();
  }
  onEnter(): void {
    this.player.sprite.play(`${ENTITY_ANIMATION.jump}${this.player.sprite.name}`);
    this.player.sprite.body.setVelocityY(-SPEED_PLAYER * SPEED_UP_PLAYER);
  }
  onExit(): void {
    this.player.changeState(new IdleAnimation(this.player));
  }
  moveLeft(): void {
    if (this.player.sprite.body.onFloor()) {
      this.player.changeState(new MoveLeftAnimation(this.player));
    } else {
      this.player.sprite
        .setScale(-SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER)
        .setBodySize(WIDTH_PLAYER, HEIGHT_PLAYER, true)
        .setOffset((this.player.sprite.width + WIDTH_PLAYER) / 2, (this.player.sprite.height - HEIGHT_PLAYER) / 2)
        .body.setVelocityX(-SPEED_PLAYER);
    }
  }
  moveRight(): void {
    if (this.player.sprite.body.onFloor()) {
      this.player.changeState(new MoveRightAnimation(this.player));
    } else {
      this.player.sprite
        .setScale(SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER)
        .setOffset(0, 0)
        .setBodySize(WIDTH_PLAYER, HEIGHT_PLAYER, true)
        .body.setVelocityX(SPEED_PLAYER);
    }
  }
  jump(): void {
    // console.log('no implement');
  }
}
