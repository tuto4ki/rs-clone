import { ENTITY_ANIMATION, SCALE_SIZE_PLAYER, SPEED_PLAYER } from '../constGame';
import Player from '../player';
import FallLeftAnimation from './fallLeftAnimation';
import IdleAnimation from './idleAnimation';
import MoveLeftAnimation from './moveLeftAnimation';
import MoveRightAnimation from './moveRightAnimation';
import StateAnimation from './stateAnimation';

export default class FallRightAnimation extends StateAnimation {
  constructor(player: Player) {
    super(player);
    this.onEnter();
  }
  onEnter(): void {
    this.player.sprite.setScale(SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER).body.setVelocityX(SPEED_PLAYER);
    this.player.sprite.play(`${ENTITY_ANIMATION.jump}${this.player.sprite.name}`);
    //'jumpPlayer');
  }
  onExit(): void {
    this.player.changeState(new IdleAnimation(this.player));
  }
  moveLeft(): void {
    if (this.player.sprite.body.onFloor()) {
      this.player.changeState(new MoveLeftAnimation(this.player));
    } else {
      this.player.changeState(new FallLeftAnimation(this.player));
    }
  }
  moveRight(): void {
    if (this.player.sprite.body.onFloor()) {
      this.player.changeState(new MoveRightAnimation(this.player));
    }
  }
  jump(): void {
    console.log('no implement');
  }
}
