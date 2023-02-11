import Enemy from './enemy';

export default class ChaseEnemy extends Enemy {
  private _isChase = false;
  public update(xPos: number, yPos: number) {
    if (!this._sprite.getData('isDead')) {
      if (Math.abs(this._sprite.x - xPos) < 400 && Math.abs(yPos - this._sprite.y) < 30) {
        if (!this._isChase) {
          this._sprite.play(this._animationKey.run);
          this._isChase = true;
          this._speedRun = 8;
        }
        const newDirection = this._sprite.x > xPos ? -1 : 1;
        if (newDirection !== this._directionEnemy) {
          this._directionEnemy = newDirection;
          this._sprite
            .setScale(this._directionEnemy * this._animationKey.scale, this._animationKey.scale)
            .setBodySize(this._animationKey.bodySize.width, this._animationKey.bodySize.height, true)
            .setOffset(this._directionEnemy < 0 ? this._animationKey.bodySize.width : 0, 0)
            .refreshBody();
        }
      } else {
        if (this._isChase) {
          this._sprite.play(this._animationKey.walk);
          this._isChase = false;
          this._speedRun = 1;
        }
      }
    }
    super.update();
  }
}
