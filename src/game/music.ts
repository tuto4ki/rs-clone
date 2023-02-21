import { EMUSIC } from './constGame';
import Phaser from 'phaser';
export default class Music {
  public isPlayMusic!: boolean;
  public isPlaySoundEffect!: boolean;
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
    this._mapSounds.set(EMUSIC.soundBg, this._scene.sound.add(EMUSIC.soundBg, { loop: true }));
    this._mapSounds.set(EMUSIC.jump, this._scene.sound.add(EMUSIC.jump, { loop: false }));
    this._mapSounds.set(EMUSIC.coin, this._scene.sound.add(EMUSIC.coin, { loop: false }));
    this._mapSounds.set(EMUSIC.dieEnemy, this._scene.sound.add(EMUSIC.dieEnemy, { loop: false }));
    this._mapSounds.set(EMUSIC.diePlayer, this._scene.sound.add(EMUSIC.diePlayer, { loop: false }));
    this._mapSounds.set(EMUSIC.win, this._scene.sound.add(EMUSIC.win, { loop: false }));
    this.playBg(EMUSIC.soundBg);
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

  public mute() {
    this._mapSounds.forEach((value) => value, (this._scene.sound.volume = 0));
  }

  public unMute() {
    this._mapSounds.forEach((value) => value, (this._scene.sound.volume = 1));
  }

  public playBg(key: string): void {
    this.checkStorage();
    if (this.isPlayMusic) {
      console.log('play soundBg');
      this._mapSounds.get(key)?.play();
    }
  }

  public checkStorage() {
    console.log('change isPlaymusic || isPlaySoundEffect');
    this.isPlayMusic = JSON.parse(localStorage.getItem('isPlayMusic') || 'true');
    this.isPlaySoundEffect = JSON.parse(localStorage.getItem('isPlaySoundEffect') || 'true');
  }
}
