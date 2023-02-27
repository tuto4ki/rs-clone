import { createListenerLS } from './components/controller/localStorage';
import Footer from './components/footer/footer';
import Game from './components/game/game';
import Header from './components/header/header';
import Login from './components/login/login';
import Popup from './components/popup/popup';

export default class App {
  header: Header;
  game: Game;
  footer: Footer;
  login: Login;
  popup: Popup;

  constructor() {
    createListenerLS();
    this.header = new Header();
    this.game = new Game();
    this.footer = new Footer();
    this.login = new Login();
    this.popup = new Popup();
  }

  start() {
    document.body.append(
      this.header.createHeader(),
      this.popup.createPopup(),
      this.game.createGame(),
      this.login.createForm(() => this.game.startGame()),
      this.footer.createFooter()
    );
  }
}
