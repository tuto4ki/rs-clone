import { ENEMY_TYPE, ENTITY_ANIMATION, IMAGES, MONEY, PLAYER_TYPE } from '../game/constGame';

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
    this.load.image(IMAGES.bgLevel1, '../assets/images/bg.png');
    this.load.image(IMAGES.emptyPicture, '../assets/images/empty.png');
    this.load.atlas(PLAYER_TYPE.fox, '../assets/sprites/fox.png', '../assets/json/fox.json');
    this.load.atlas(ENEMY_TYPE.zombieGirl, '../assets/sprites/zombieGirl.png', '../assets/json/zombieGirl.json');
    this.load.atlas(ENEMY_TYPE.zombieMan, '../assets/sprites/zombieMan.png', '../assets/json/zombieMan.json');
    this.load.image(IMAGES.plate, '../assets/images/plateEndGame.png');
    this.load.atlas(MONEY, '../assets/sprites/spritesheet-4.png', '../assets/json/spritesheet-4.json');
    // load level 1
    this.load.image('tiles', '../assets/sprites/freeTiles.png');
    this.load.tilemapTiledJSON('map', '../assets/json/level1.json');
  }
  public create(): void {
    this.createAnimationPlayer(PLAYER_TYPE.fox);
    this.createAnimationZombie(ENEMY_TYPE.zombieGirl);
    this.createAnimationZombie(ENEMY_TYPE.zombieMan);
    this.createAnimationMoney();
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

  private createAnimationPlayer(type: string): void {
    this.addAnimationToManager(`${ENTITY_ANIMATION.run}${type}`, type, 'Run_', 1, 8, 2, 15, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.jump}${type}`, type, 'Jump_', 1, 8, 2, 15, 0);
    this.addAnimationToManager(`${ENTITY_ANIMATION.idle}${type}`, type, 'Idle_', 1, 10, 2, 15, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.dead}${type}`, type, 'Dead_', 1, 10, 2, 15, 0);
  }

  private createAnimationZombie(type: string) {
    this.addAnimationToManager(`${ENTITY_ANIMATION.walk}${type}`, type, 'Walk_', 1, 6, 2, 10, -1);
    this.addAnimationToManager(`${ENTITY_ANIMATION.dead}${type}`, type, 'Dead_', 1, 8, 2, 10, 0);
    this.addAnimationToManager(`${ENTITY_ANIMATION.run}${type}`, type, 'Run_', 3, 10, 2, 15, -1);
  }

  private createAnimationMoney() {
    this.addAnimationToManager(MONEY, MONEY, 'gold_', 1, 10, 2, 10, -1);
  }

  private addAnimationToManager(
    key: string,
    type: string,
    prefix: string,
    start: number,
    end: number,
    zeroPad: number,
    frameRate: number,
    repeat: number
  ) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNames(type, { prefix: prefix, start: start, end: end, zeroPad: zeroPad }),
      frameRate: frameRate,
      repeat: repeat,
    });
  }
}
