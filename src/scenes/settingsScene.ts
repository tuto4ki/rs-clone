import Modal from '../components/modal/soundModal';
import { ESCENE, HEIGHT_GAME, WIDTH_GAME } from '../game/constGame';
import { IPassScene } from '../game/type';

export default class SettingsScene extends Phaser.Scene {
  private _typeScene = '';

  constructor() {
    super(ESCENE.settings);
  }

  public create(): void {
    const modal = new Modal(this, WIDTH_GAME / 2, HEIGHT_GAME / 2, 300, 200, this._typeScene);
    modal.setScale(0);
    this.add.existing(modal);
    modal.open();
  }

  public init(data: IPassScene): void {
    this._typeScene = data.scene;
  }
}
