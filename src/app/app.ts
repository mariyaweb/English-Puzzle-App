import TemplatePage from './pages/templatePage';
import StartPage from './pages/start/startPage';
import GamePage from './pages/game/gamePage';
import SelectGame from './modules/SelectGame/selectGame';
import { Pages, RoutesPage } from './router/router-types';
import BaseElement from './ui/base-element/base-element';
import Router from './router/router';
import State from './state/state';
import LoginPage from './pages/login/loginPage';
import '../style.css';

export default class App {
  public state: State;

  public router: Router;

  private page: TemplatePage;

  private game: GamePage;

  private selectGame: SelectGame;

  private login: LoginPage;

  private startPage: StartPage;

  constructor() {
    this.state = new State();
    const routes = this.createRoutes();
    this.router = new Router(this.state, routes);
    this.page = new TemplatePage(this.router);
    this.startPage = new StartPage(this.router);
    this.selectGame = new SelectGame();
    this.game = new GamePage(this.selectGame);
    this.login = new LoginPage(this.router);
    this.selectGame.observerManager.subscribe(this.game.field.update);
    this.state.eventManager.subscribe(this.page.header.update);
  }

  public run(): void {
    this.page.append(this.selectGame);
    document.body.append(this.page.htmlTag);
  }

  private createRoutes(): RoutesPage {
    return {
      [Pages.login]: () => {
        this.renderContent(this.login);
      },
      [Pages.start]: () => {
        if (this.state.userData) {
          this.startPage.startView.addWelcome(this.state.userData.name, this.state.userData.surname);
        }
        this.renderContent(this.startPage);
      },
      [Pages.game]: () => {
        this.renderContent(this.game);
      },
    };
  }

  private renderContent(content: BaseElement): void {
    this.page.setMainContent(content);
  }
}
