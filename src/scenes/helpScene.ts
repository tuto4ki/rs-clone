import HelpModal from '../game/modal/helpModal';
import { ESCENE } from '../game/constGame';
import { IPassScene } from '../game/type';

export default class HelpScene extends Phaser.Scene {
  private _typeScene = '';

  constructor() {
    super(ESCENE.help);
  }

  public create(): void {
    const howToPlayModal = new HelpModal(
      this,
      +this.game.config.width / 2,
      +this.game.config.height / 2,
      +this.game.config.width - 60,
      +this.game.config.height - 60,
      this._typeScene
    );
    howToPlayModal.setScale(0);
    this.add.existing(howToPlayModal);
    howToPlayModal.open();
    howToPlayModal.setDepth(1);
  }

  public init(data: IPassScene): void {
    this._typeScene = data.scene;
  }
}
