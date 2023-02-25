export default class Footer {
  createFooter(): HTMLElement {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    return footer;
  }
}
