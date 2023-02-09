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
    this.load.image('bgGame', '../assets/images/bg.png');
    this.load.image('emptyPicture', '../assets/images/empty.png');
    this.load.atlas('fox', '../assets/sprites/fox.png', '../assets/json/fox.json');
    this.load.atlas('zombieGirl', '../assets/sprites/zombieGirl.png', '../assets/json/zombieGirl.json');
    this.load.image('plate', '../assets/images/plateEndGame.png');
    // load level 1
    this.load.image('tiles', '../assets/sprites/freeTiles.png');
    this.load.tilemapTiledJSON('map', '../assets/json/level1.json');
  }
  public create(): void {
    this.createAnimationPlayer();
    this.createAnimationZombie();
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

  private createAnimationPlayer(): void {
    // animation run player
    this.anims.create({
      key: 'runPlayer',
      frames: this.anims.generateFrameNames('fox', { prefix: 'Run_', start: 1, end: 8, zeroPad: 2 }),
      frameRate: 15,
      repeat: -1,
    });
    // animation jump
    this.anims.create({
      key: 'jumpPlayer',
      frames: this.anims.generateFrameNames('fox', { prefix: 'Jump_', start: 1, end: 8, zeroPad: 2 }),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: 'stayPlayer',
      frames: this.anims.generateFrameNames('fox', { prefix: 'Idle_', start: 1, end: 10, zeroPad: 2 }),
      frameRate: 15,
      repeat: -1,
    });
    // animation died player
    this.anims.create({
      key: 'deadPlayer',
      frames: this.anims.generateFrameNames('fox', { prefix: 'Dead_', start: 1, end: 10, zeroPad: 2 }),
      frameRate: 15,
      repeat: 0,
    });
  }

  private createAnimationZombie() {
    // animation walk zombie
    this.anims.create({
      key: 'walkZombie',
      frames: this.anims.generateFrameNames('zombieGirl', { prefix: 'Walk_', start: 1, end: 6, zeroPad: 2 }),
      frameRate: 10,
      repeat: -1,
    });
    // animation died zombie
    this.anims.create({
      key: 'deadZombie',
      frames: this.anims.generateFrameNames('zombieGirl', { prefix: 'Dead_', start: 1, end: 8, zeroPad: 2 }),
      frameRate: 10,
      repeat: 0,
    });
  }
}
