import BaseElement from '../../../../ui/base-element/base-element';
import './mainWelcome.css';

export default class MainWelcome extends BaseElement {
  constructor() {
    super({ tag: 'h3', styles: ['main__welcome'] });
  }

  public setName(name: string, surname: string) {
    this.setTextContent(`Hello, ${name} ${surname}!`);
  }
}
