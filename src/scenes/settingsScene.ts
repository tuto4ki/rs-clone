import SoundModal from '../components/modal/soundModal';
import { ESCENE } from '../game/constGame';
import { IPassScene } from '../game/type';

export default class SettingsScene extends Phaser.Scene {
  private _typeScene = '';

  constructor() {
    super(ESCENE.settings);
  }

  public create(): void {
    const modal = new SoundModal(
      this,
      +this.game.config.width / 2,
      +this.game.config.height / 2,
      400,
      200,
      this._typeScene
    );
    modal.setScale(0);
    this.add.existing(modal);
    modal.open();
  }

  public init(data: IPassScene): void {
    this._typeScene = data.scene;
  }
}
