import Footer from './components/footer/footer';
import Game from './components/game/game';
import Header from './components/header/header';

export default class App {
  header: Header;
  game: Game;
  footer: Footer;

  constructor() {
    this.header = new Header();
    this.game = new Game();
    this.footer = new Footer();
  }

  start() {
    document.body.append(this.header.createHeader(), this.game.createGame(), this.footer.createFooter());
    this.game.startGame();
  }
}
