import TemplatePage from './pages/templatePage';
import StartPage from './pages/start/startPage';
import LoginForm from './modules/LoginForm/loginForm';
import GamePage from './pages/game/gamePage';
import SelectGame from './modules/SelectGame/selectGame';
import '../style.css';

export default class App {
  private page: TemplatePage;

  private game: GamePage;

  private selectGame: SelectGame;

  constructor() {
    this.page = new TemplatePage();
    this.selectGame = new SelectGame();
    this.game = new GamePage(this.selectGame);
    this.selectGame.observerManager.subscribe(this.game.field.update);
  }

  public run(): void {
    this.page.setMainContent(new StartPage());
    this.page.setMainContent(new LoginForm());
    // this.page.setMainContent(this.game);
    // this.page.appendContent(this.selectGame);
    document.body.append(this.page.htmlTag);
  }
}
