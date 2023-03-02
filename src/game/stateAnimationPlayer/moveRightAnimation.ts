import { ENTITY_ANIMATION, HEIGHT_PLAYER, SCALE_SIZE_PLAYER, SPEED_PLAYER, WIDTH_PLAYER } from '../constGame';
import Player from '../player';
import FallRightAnimation from './fallRightAnimation';
import IdleAnimation from './idleAnimation';
import JumpAnimation from './jumpAnimation';
import MoveLeftAnimation from './moveLeftAnimation';
import StateAnimation from './stateAnimation';

export default class MoveRightAnimation extends StateAnimation {
  constructor(player: Player) {
    super(player);
    this.onEnter();
  }
  onEnter(): void {
    this.player.sprite.play(`${ENTITY_ANIMATION.run}${this.player.sprite.name}`);
    this.player.sprite
      .setScale(SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER)
      .setOffset(0, 0)
      .setBodySize(WIDTH_PLAYER, HEIGHT_PLAYER, true)
      .body.setVelocityX(SPEED_PLAYER);
  }
  onExit(): void {
    this.player.changeState(new IdleAnimation(this.player));
  }
  moveLeft(): void {
    this.player.changeState(new MoveLeftAnimation(this.player));
  }
  moveRight(): void {
    if (!this.player.sprite.body.onFloor()) {
      this.player.changeState(new FallRightAnimation(this.player));
    }
  }
  jump(): void {
    this.player.changeState(new JumpAnimation(this.player));
  }
}
