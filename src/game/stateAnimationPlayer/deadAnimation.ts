import Player from '../player';
import StateAnimation from './stateAnimation';

export default class DeadAnimation extends StateAnimation {
  constructor(player: Player) {
    super(player);
    this.onEnter();
  }
  onEnter(): void {
    this.player.sprite.play('deadPlayer');
    this.player.sprite.setScale(this.player.sprite.scaleX, this.player.sprite.scaleY).body.setVelocityX(0);
  }
  onExit(): void {
    // exit
  }
  moveLeft(): void {
    // left
  }
  moveRight(): void {
    // right
  }
  jump(): void {
    // jump
  }
}
