import './popup.scss';
import i18next from 'i18next';

const CL_HIDDEN = 'hidden';

export default class Popup {
  private _popupBg: HTMLDivElement;
  private _popup: HTMLDivElement;
  private _gamePage: HTMLButtonElement;
  constructor() {
    this._popupBg = document.createElement('div');
    this._popup = document.createElement('div');
    this._gamePage = document.createElement('button');
  }

  createPopup(): HTMLDivElement {
    this._popupBg.classList.add('popupBg');
    this._popup.classList.add('popup');
    this._popupBg.classList.add('hidden');
    this._popupBg.classList.add(CL_HIDDEN);
    this._popupBg.append(this._popup);
    this._gamePage.addEventListener('click', this.onClickPopup.bind(this));
    this._gamePage.innerHTML = i18next.t<string>(`back`);
    this._gamePage.classList.add('button');
    this._popup.append(this._gamePage);
    return this._popupBg;
  }

  onClickPopup(): void {
    console.log('click');
    this._popup.lastChild?.remove();
    this._popupBg.classList.add(CL_HIDDEN);
    document.querySelector('.main')?.classList.remove(CL_HIDDEN);
    this._popupBg.classList.remove('flex');
  }
}
