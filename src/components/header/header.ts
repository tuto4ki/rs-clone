export default class Header {
  createHeader(): HTMLElement {
    const header = document.createElement('header');
    header.classList.add('header');
    return header;
  }
}
