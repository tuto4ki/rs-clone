import { EMUSIC } from './constGame';

export default class Music {
  public isPlayMusic = true;
  public isPlaySoundEffect = true;
  private _scene: Phaser.Scene;
  public soundBg: Phaser.Sound.BaseSound | null = null;
  public jump: Phaser.Sound.BaseSound | null = null;
  public coin: Phaser.Sound.BaseSound | null = null;
  public diePlayer: Phaser.Sound.BaseSound | null = null;
  public dieEnemy: Phaser.Sound.BaseSound | null = null;

  private _mapSounds: Map<string, Phaser.Sound.BaseSound>;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
    this._mapSounds = new Map();
  }

  public create() {
    this.soundBg = this._scene.sound.add(EMUSIC.soundBg, { loop: true });
    this.soundBg.play();
    /*
    this.jump = this._scene.sound.add(EMUSIC.jump, { loop: false });
    this.coin = this._scene.sound.add(EMUSIC.coin, { loop: false });
    this.dieEnemy = this._scene.sound.add(EMUSIC.dieEnemy, { loop: false });
    this.diePlayer = this._scene.sound.add(EMUSIC.diePlayer, { loop: false });
    */
    this._mapSounds.set(EMUSIC.soundBg, this.soundBg);
    this._mapSounds.set(EMUSIC.jump, this._scene.sound.add(EMUSIC.jump, { loop: false }));
    this._mapSounds.set(EMUSIC.coin, this._scene.sound.add(EMUSIC.coin, { loop: false }));
    this._mapSounds.set(EMUSIC.dieEnemy, this._scene.sound.add(EMUSIC.dieEnemy, { loop: false }));
    this._mapSounds.set(EMUSIC.diePlayer, this._scene.sound.add(EMUSIC.diePlayer, { loop: false }));
    this._mapSounds.set(EMUSIC.win, this._scene.sound.add(EMUSIC.win, { loop: false }));
  }

  public play(key: string): void {
    if (this.isPlaySoundEffect) {
      this._mapSounds.get(key)?.play();
    }
  }

  public stop(key: string): void {
    this._mapSounds.get(key)?.stop();
  }

  public pause() {
    this._mapSounds.forEach((value) => value.pause());
  }
}
