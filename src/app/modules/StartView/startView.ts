import BaseElement from '../../ui/base-element/base-element';
import { div } from '../../ui/base-tags/base-tags';
import { mainSubtitle } from './components/MainSubtitle/mainSubtitle';
import { mainTitle } from './components/MainTitle/mainTitle';
import MainWelcome from './components/MainWelcome/mainWelcome';
import SloganImg from './components/SloganImg/sloganImg';
import { startBtn } from './components/StartBtn/startBtn';
import './startView.css';

export default class StartView extends BaseElement {
  private welcome: MainWelcome;

  private content: BaseElement;

  constructor() {
    super({ tag: 'div', styles: ['wrapper', 'start__wrapper'] });
    this.content = div({ styles: ['start__content'] });
    this.welcome = new MainWelcome();
    this.content.addChildren([new SloganImg(), mainTitle, this.welcome, mainSubtitle, startBtn]);
    this.addChildren([this.content]);
  }

  private addWelcome(name: string, surname: string): void {
    this.welcome.setName(name, surname);
  }
}
