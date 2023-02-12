import { ENTITY_ANIMATION, SCALE_SIZE_PLAYER, SPEED_PLAYER } from '../constGame';
import Player from '../player';
import FallLeftAnimation from './fallLeftAnimation';
import IdleAnimation from './idleAnimation';
import JumpAnimation from './jumpAnimation';
import MoveRightAnimation from './moveRightAnimation';
import StateAnimation from './stateAnimation';

export default class MoveLeftAnimation extends StateAnimation {
  constructor(player: Player) {
    super(player);
    this.onEnter();
  }
  onEnter(): void {
    this.player.sprite.play(`${ENTITY_ANIMATION.run}${this.player.sprite.name}`);
    // 'runPlayer');
    this.player.sprite.setScale(-SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER).body.setVelocityX(-SPEED_PLAYER);
  }
  onExit(): void {
    this.player.changeState(new IdleAnimation(this.player));
  }
  moveLeft(): void {
    if (!this.player.sprite.body.onFloor()) {
      this.player.changeState(new FallLeftAnimation(this.player));
    }
  }
  moveRight(): void {
    this.player.changeState(new MoveRightAnimation(this.player));
  }
  jump(): void {
    this.player.changeState(new JumpAnimation(this.player));
  }
}
