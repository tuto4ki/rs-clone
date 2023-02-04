import { SCALE_SIZE_PLAYER, SPEED_PLAYER } from '../constGame';
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
    this.player.sprite.play('runPlayer');
    this.player.sprite.setScale(SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER).body.setVelocityX(SPEED_PLAYER);
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
