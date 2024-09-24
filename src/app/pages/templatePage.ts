import Header from '../components/Header/header';
import BaseElement from '../ui/base-element/base-element';
import { main } from '../ui/base-tags/base-tags';

export default class TemplatePage extends BaseElement<HTMLDivElement> {
  private header: Header;

  private main: BaseElement;

  constructor() {
    super({ styles: ['app'] });
    this.header = new Header();
    this.main = main({ styles: ['main'] });
    this.render();
  }

  setMainContent(content: BaseElement) {
    this.main.destroyChildren();
    this.main.append(content);
  }

  addMainContent(content: BaseElement) {
    this.main.append(content);
  }

  render() {
    this.addChildren([this.header, this.main]);
  }
}
