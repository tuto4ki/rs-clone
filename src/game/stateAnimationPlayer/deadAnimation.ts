import { ENTITY_ANIMATION } from '../constGame';
import Player from '../player';
import StateAnimation from './stateAnimation';

export default class DeadAnimation extends StateAnimation {
  constructor(player: Player) {
    super(player);
    this.onEnter();
  }
  onEnter(): void {
    this.player.sprite.play(`${ENTITY_ANIMATION.dead}${this.player.sprite.name}`);
    this.player.sprite.setScale(this.player.sprite.scaleX, this.player.sprite.scaleY).body.setVelocityX(0);
  }
  onExit(): void {
    // console.log('no implement');
  }
  moveLeft(): void {
    // console.log('no implement');
  }
  moveRight(): void {
    // console.log('no implement');
  }
  jump(): void {
    // console.log('no implement');
  }
}
