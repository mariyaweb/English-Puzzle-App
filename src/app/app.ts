import TemplatePage from './pages/templatePage';
import StartPage from './pages/start/startPage';
import '../style.css';

export default class App {
  private page: TemplatePage;

  constructor() {
    this.page = new TemplatePage();
  }

  public run(): void {
    this.page.setMainContent(new StartPage());
    document.body.append(this.page.htmlTag);
  }
}
