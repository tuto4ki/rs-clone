import Footer from './components/footer/footer';
import Game from './components/game/game';
import Header from './components/header/header';
import Login from './components/login/login';

export default class App {
  header: Header;
  game: Game;
  footer: Footer;
  login: Login;

  constructor() {
    this.header = new Header();
    this.game = new Game();
    this.footer = new Footer();
    this.login = new Login();
  }

  start() {
    document.body.append(
      this.header.createHeader(),
      this.login.createForm(),
      // this.game.createGame(),
      this.footer.createFooter()
    );
    this.game.startGame();
  }
}
