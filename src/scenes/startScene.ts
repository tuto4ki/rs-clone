import WebFontFile from '../assets/fonts/webFontFile';

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
    this.load.image('groundMiddle', '../assets/sprites/ground.png');
    this.load.image('player', '../assets/sprites/dog.png');
    this.load.image('gearBtn', '../assets/sprites/gear.png');
    this.load.image('helpBtn', '../assets/sprites/buttons/helpBtn.svg');
    this.load.image('playBtn', '../assets/sprites/buttons/playBtn.svg');
    this.load.image('exitBtn', '../assets/sprites/buttons/exitBtn.svg');
    this.load.image('homeBtn', '../assets/sprites/buttons/homeBtn.svg');
    this.load.image('infoBtn', '../assets/sprites/buttons/infoBtn.svg');
    this.load.image('menuBtn', '../assets/sprites/buttons/menuBtn.svg');
    this.load.image('soundOnBtn', '../assets/sprites/buttons/soundOnBtn.svg');
    this.load.image('soundOffBtn', '../assets/sprites/buttons/soundOffBtn.svg');
    this.load.image('leaderBoardBtn', '../assets/sprites/buttons/leaderboardBtn.svg');
    this.load.image('closeBtn', '../assets/sprites/buttons/closeBtn.svg');
    const fonts = new WebFontFile(this.load, 'Itim');
    this.load.addFile(fonts);
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
