import WebFontFile from '../assets/fonts/webFontFile';
import { HEIGHT_GAME, WIDTH_GAME } from '../constGame';
import Modal from '../components/modal/soundModal';
import helpModal from '../components/modal/helpModal';
import DieModal from '../components/modal/dieModal';

// enum Texts {
//   title = 'Mario Clone',
//   message = 'Click anywhere to start',
// }

// enum Styles {
//   color = '#008080',
//   font = 'Arial',
//   size = '52',
// }

export class StartScene extends Phaser.Scene {
  selectedCharacter: unknown;
  textBtn: Phaser.GameObjects.Text | undefined;
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
    this.load.image('reloadBtn', '../assets/sprites/buttons/reloadBtn.svg');
    this.load.image('soundOnBtn', '../assets/sprites/buttons/soundOnBtn.svg');
    this.load.image('soundOffBtn', '../assets/sprites/buttons/soundOffBtn.svg');
    this.load.image('leaderBoardBtn', '../assets/sprites/buttons/leaderboardBtn.svg');
    this.load.image('closeBtn', '../assets/sprites/buttons/closeBtn.svg');
    this.load.image('howToPlay', '../assets/sprites/howToPlay.png');
    //
    this.load.image('catAvatar', '../assets/sprites/catAvatar.png');
    this.load.image('foxAvatar', '../assets/sprites/foxAvatar.png');
    const fonts = new WebFontFile(this.load, 'Itim');
    this.load.addFile(fonts);
  }
  public create(): void {
    const chooseTitle = this.add
      .text(WIDTH_GAME / 2, 30, 'Choose Your Character ', {
        fontFamily: 'Itim',
        fontSize: '30px',
        color: '#F5F901',
        stroke: '#E52121',
        strokeThickness: 6,
        shadow: { color: '#010101', fill: true, blur: 4, offsetX: 6, offsetY: 0 },
      })
      .setOrigin(0.5, 0.5);
    chooseTitle.name = 'title';

    const player1 = this.add
      .image(WIDTH_GAME / 2 - 100, HEIGHT_GAME / 2 - 200, 'catAvatar')
      .setInteractive({ useHandCursor: true })
      .setScale(0.2);
    const player2 = this.add
      .image(WIDTH_GAME / 2 + 100, HEIGHT_GAME / 2 - 200, 'foxAvatar')
      .setInteractive({ useHandCursor: true })
      .setScale(0.2);
    player1.name = 'catAvatar';
    player2.name = 'foxAvatar';
    player1.setTint(0xa79999);
    player2.setTint(0xa79999);

    let selectedCharacter: Phaser.GameObjects.Image | null = null;

    player1.on('pointerdown', () => {
      console.log('cat');
      selectedCharacter = player1;
      player1.setTint(0xffffff);
      player2.setTint(0xa79999);
      playBtn.setTint(0xffffff).setInteractive();
    });
    player2.on('pointerdown', () => {
      console.log('fox');
      selectedCharacter = player2;
      player2.setTint(0xffffff);
      player1.setTint(0xa79999);
      playBtn.setTint(0xffffff).setInteractive();
    });

    // модалки start
    const gearBtn = this.add.image(977, 71, 'gearBtn').setInteractive({ useHandCursor: true }).setScale(0.47);
    gearBtn.name = 'gearBtn';
    const helpBtn = this.add.image(976, 29, 'helpBtn').setInteractive({ useHandCursor: true }).setScale(0.25);
    helpBtn.name = 'helpBtn';
    const modal = new Modal(this, WIDTH_GAME / 2, HEIGHT_GAME / 2, 300, 200);
    modal.setScale(0);
    this.add.existing(modal);
    gearBtn.on('pointerdown', () => {
      if (!modal.isOpen) {
        modal.open();
      }
    });
    const howToPlayModal = new helpModal(this, WIDTH_GAME / 2, HEIGHT_GAME / 2, WIDTH_GAME - 60, HEIGHT_GAME - 60);
    howToPlayModal.setScale(0);
    this.add.existing(howToPlayModal);
    helpBtn.on('pointerdown', () => {
      if (!howToPlayModal.isOpen) {
        howToPlayModal.open();
        howToPlayModal.setDepth(1);
      }
    });
    const dieModal = new DieModal(this, WIDTH_GAME / 2, HEIGHT_GAME / 2, 400, 300);
    dieModal.setScale(0);
    dieModal.name = 'dieModal';
    this.add.existing(dieModal);
    // to do  событие по которому будет открываться модалка DieModal
    // ???.on('pointerdown', () => {
    //   if (!dieModal.isOpen) {
    //     dieModal.open();
    //   }
    // });
    // модалки end
    this.textBtn = this.add
      .text(WIDTH_GAME / 2, HEIGHT_GAME - 80, 'To start playing, select a character and press the Play button', {
        fontFamily: 'Itim',
        fontSize: '24px',
        color: '#fff',
        stroke: '#C83737',
        strokeThickness: 2,
      })
      .setOrigin(0.5, 0.5);

    const playBtn = this.add
      .image(WIDTH_GAME / 2, HEIGHT_GAME - 30, 'playBtn')
      .setInteractive({ useHandCursor: true })
      .setScale(0.25);
    playBtn.name = 'playBtn';
    playBtn.on('pointerdown', () => {
      if (selectedCharacter === null) {
        return;
      } else {
        this.scene.start('Game');
        console.log('Selected character: ', selectedCharacter);
      }
    });
    playBtn.setTint(0xa79999);
    playBtn.disableInteractive();
  }
}
