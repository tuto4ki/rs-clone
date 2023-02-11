enum Texts {
  title = 'Mario Clone',
  message = 'Click anywhere to start',
}

enum Styles {
  color = '#008080',
  font = 'Arial',
  size = '52',
}

export class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }
  public preload(): void {
    this.load.image('bgGame', '../assets/sprites/bg.png');
    this.load.atlas('fox', '../assets/sprites/fox.png', '../assets/json/fox.json');
    // load level 1
    this.load.image('tiles', '../assets/sprites/freeTiles.png');
    this.load.tilemapTiledJSON('map', '../assets/json/level1.json');
  }
  public create(): void {
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY - 100, Texts.title, {
        font: `${Styles.size}px ${Styles.font}`,
        color: Styles.color,
      })
      .setOrigin(0.5);

    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY + 100, Texts.message, {
        font: `28px ${Styles.font}`,
        color: Styles.color,
      })
      .setOrigin(0.5);
    this.input.once('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}
