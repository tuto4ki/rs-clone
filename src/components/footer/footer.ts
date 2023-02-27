import { elementGenerator } from '../controller/taggenerator';
import './footer.scss';
export default class Footer {
  private _footer: HTMLDivElement;
  private _footerText: HTMLParagraphElement;
  private _ghPages: HTMLDivElement;
  private _linkS: HTMLAnchorElement;
  private _imgS: HTMLImageElement;
  private _linkA: HTMLAnchorElement;
  private _imgA: HTMLImageElement;
  private _linkV: HTMLAnchorElement;
  private _imgV: HTMLImageElement;
  private _linkRs: HTMLAnchorElement;
  private _imgRs: HTMLImageElement;
  constructor() {
    this._footer = elementGenerator.createDiv({ className: 'footer' });
    this._footerText = elementGenerator.createParagraph({ className: 'footer-text' });
    this._footerText.innerText = '© 2023';
    this._ghPages = elementGenerator.createDiv({ className: 'ghPages' });
    this._linkS = document.createElement('a');
    this._linkS.href = 'https://github.com/tuto4ki';
    this._linkS.target = '_blank';
    this._imgS = document.createElement('img');
    this._imgS.className = 'footer-img';
    this._imgS.src = '../../assets/images/github-r.svg';
    this._linkS.append(this._imgS);
    this._linkA = document.createElement('a');
    this._linkA.href = 'https://github.com/Morsul';
    this._linkA.target = '_blank';
    this._imgA = document.createElement('img');
    this._imgA.className = 'footer-img';
    this._imgA.src = '../../assets/images/github-g.svg';
    this._linkA.append(this._imgA);
    this._linkV = document.createElement('a');
    this._linkV.href = 'https://github.com/VladimirG91';
    this._linkV.target = '_blank';
    this._imgV = document.createElement('img');
    this._imgV.className = 'footer-img';
    this._imgV.src = '../../assets/images/github-b.svg';
    this._linkV.append(this._imgV);
    this._linkRs = document.createElement('a');
    this._linkRs.href = 'https://rs.school/js/';
    this._linkRs.target = '_blank';
    this._imgRs = document.createElement('img');
    this._imgRs.className = 'footer-img';
    this._imgRs.src = '../../assets/images/logo-rs.svg';
    this._linkRs.append(this._imgRs);
  }
  createFooter(): HTMLElement {
    this._ghPages.append(this._linkS, this._linkA, this._linkV);
    this._footer.append(this._ghPages, this._footerText, this._linkRs);
    return this._footer;
  }
}
