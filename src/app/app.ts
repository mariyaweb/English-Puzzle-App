import TemplatePage from "./pages/templatePage";

export default class App {
  private page: TemplatePage;
  constructor() {
    this.page = new TemplatePage();
  }

  public run(): void {
    document.body.append(this.page.htmlTag);
  }
}
