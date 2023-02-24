import DieModal from '../components/modal/dieModal';
import { ESCENE, PLAYER_TYPE } from '../game/constGame';
import { IPassScene } from '../game/type';

const WIDTH_MODAL = 450;
const HEIGHT_MODAL = 350;
export default class EndGameScene extends Phaser.Scene {
  private _typeScene = '';
  private _isWin = false;
  private _isLevelNext = false;
  private _playerType = PLAYER_TYPE.fox;

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
      this._typeScene,
      this._playerType,
      this._isLevelNext
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
    if (data.isLevelNext !== undefined) {
      this._isLevelNext = data.isLevelNext;
    }
    if (data.playerType) {
      this._playerType = data.playerType;
    }
  }
}
