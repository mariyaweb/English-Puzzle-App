import TemplatePage from './pages/templatePage';
import StartPage from './pages/start/startPage';
import LoginForm from './modules/LoginForm/loginForm';
import '../style.css';
import GamePage from './pages/game/gamePage';

export default class App {
  private page: TemplatePage;

  constructor() {
    this.page = new TemplatePage();
  }

  public run(): void {
    this.page.setMainContent(new StartPage());
    this.page.setMainContent(new LoginForm());
    this.page.setMainContent(new GamePage());
    document.body.append(this.page.htmlTag);
  }
}
