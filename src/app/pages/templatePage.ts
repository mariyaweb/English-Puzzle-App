import Header from '../components/Header/header';
import Router from '../router/router';
import BaseElement from '../ui/base-element/base-element';
import { main } from '../ui/base-tags/base-tags';

export default class TemplatePage extends BaseElement<HTMLDivElement> {
  public header: Header;

  private main: BaseElement;

  constructor(router: Router) {
    super({ styles: ['app'] });
    this.header = new Header(router);
    this.main = main({ styles: ['main'] });
    this.render();
  }

  public setMainContent(content: BaseElement): void {
    this.main.setTextContent('');
    this.main.append(content);
  }

  public appendContent(content: BaseElement): void {
    this.append(content);
  }

  private render(): void {
    this.addChildren([this.header, this.main]);
  }
}
