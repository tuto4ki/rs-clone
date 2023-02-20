import DieModal from '../components/modal/dieModal';
import { ESCENE } from '../game/constGame';
import { IPassScene } from '../game/type';

const WIDTH_MODAL = 400;
const HEIGHT_MODAL = 350;
export default class EndGameScene extends Phaser.Scene {
  private _typeScene = '';
  private _isWin = false;

  constructor() {
    super(ESCENE.end);
  }

  public create(): void {
    const dieModal = new DieModal(
      this,
      +this.game.config.width / 2,
      +this.game.config.height / 2,
      WIDTH_MODAL,
      HEIGHT_MODAL,
      this._isWin,
      this._typeScene
    );
    dieModal.scrollFactorX = 0;
    dieModal.setScale(0);
    dieModal.name = 'WIN';
    this.add.existing(dieModal);
    dieModal.open();
  }

  public init(data: IPassScene): void {
    this._typeScene = data.scene;
    if (data.isDied !== undefined) {
      this._isWin = data.isDied;
    }
  }
}
