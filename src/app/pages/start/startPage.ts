import StartDecor from '../../modules/StartView/components/StartDecor/startDecor';
import StartView from '../../modules/StartView/startView';
import BaseElement from '../../ui/base-element/base-element';

export default class StartPage extends BaseElement {
  constructor() {
    super({ tag: 'div', styles: ['start'] });
    this.addChildren([new StartView(), new StartDecor()]);
  }
}
