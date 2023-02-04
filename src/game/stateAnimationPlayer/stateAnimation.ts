import Player from '../player';
export default abstract class StateAnimation {
  player: Player;
  constructor(player: Player) {
    this.player = player;
  }
  abstract onEnter(): void;
  abstract onExit(): void;
  abstract moveLeft(): void;
  abstract moveRight(): void;
  abstract jump(): void;
}
