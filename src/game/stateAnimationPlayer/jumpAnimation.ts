import { SCALE_SIZE_PLAYER, SPEED_PLAYER, SPEED_UP_PLAYER } from '../constGame';
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
    this.player.sprite.body.setVelocityY(-SPEED_PLAYER * SPEED_UP_PLAYER);
    this.player.sprite.play('jumpPlayer');
  }
  onExit(): void {
    this.player.changeState(new IdleAnimation(this.player));
  }
  moveLeft(): void {
    if (this.player.sprite.body.onFloor()) {
      this.player.changeState(new MoveLeftAnimation(this.player));
    } else {
      this.player.sprite.setScale(-SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER).body.setVelocityX(-SPEED_PLAYER);
    }
  }
  moveRight(): void {
    if (this.player.sprite.body.onFloor()) {
      this.player.changeState(new MoveRightAnimation(this.player));
    } else {
      this.player.sprite.setScale(SCALE_SIZE_PLAYER, SCALE_SIZE_PLAYER).body.setVelocityX(SPEED_PLAYER);
    }
  }
  jump(): void {
    console.log('no implement');
  }
}
