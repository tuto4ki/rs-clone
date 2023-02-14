import HelpModal from '../components/modal/helpModal';
import { ESCENE, HEIGHT_GAME, WIDTH_GAME } from '../game/constGame';
import { IPassScene } from '../game/type';

export default class HelpScene extends Phaser.Scene {
  private _typeScene = '';

  constructor() {
    super(ESCENE.help);
  }

  public create(): void {
    const howToPlayModal = new HelpModal(
      this,
      WIDTH_GAME / 2,
      HEIGHT_GAME / 2,
      WIDTH_GAME - 60,
      HEIGHT_GAME - 60,
      this._typeScene
    );
    howToPlayModal.setScale(0);
    this.add.existing(howToPlayModal);
    howToPlayModal.open();
  }

  public init(data: IPassScene): void {
    this._typeScene = data.scene;
  }
}
