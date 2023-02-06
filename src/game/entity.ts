export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, key: string, type: string) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.setData('type', type);
    this.setData('isDead', false);
  }
}
