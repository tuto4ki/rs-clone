import Footer from './components/footer/footer';
import Game from './components/game/game';
import Header from './components/header/header';
import Login from './components/login/login';
// import Menu from './components/menu/menu';

export default class App {
  header: Header;
  game: Game;
  footer: Footer;
  login: Login;
  // menu: Menu;

  constructor() {
    this.header = new Header();
    this.game = new Game();
    this.footer = new Footer();
    this.login = new Login();
    // this.menu = new Menu();
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
