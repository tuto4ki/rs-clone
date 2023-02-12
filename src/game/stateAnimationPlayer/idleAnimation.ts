import { ENTITY_ANIMATION } from '../constGame';
import Player from '../player';
import JumpAnimation from './jumpAnimation';
import MoveLeftAnimation from './moveLeftAnimation';
import MoveRightAnimation from './moveRightAnimation';
import StateAnimation from './stateAnimation';

export default class IdleAnimation extends StateAnimation {
  constructor(player: Player) {
    super(player);
    this.onEnter();
  }
  onEnter(): void {
    this.player.sprite.body.setVelocityX(0);
    this.player.sprite.play(`${ENTITY_ANIMATION.idle}${this.player.sprite.name}`);
    // 'stayPlayer');
  }
  onExit(): void {
    console.log('no implement');
  }
  moveLeft(): void {
    this.player.changeState(new MoveLeftAnimation(this.player));
  }
  moveRight(): void {
    this.player.changeState(new MoveRightAnimation(this.player));
  }
  jump(): void {
    this.player.changeState(new JumpAnimation(this.player));
  }
}
