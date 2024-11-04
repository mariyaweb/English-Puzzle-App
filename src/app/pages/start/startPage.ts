import StartDecor from '../../modules/StartView/components/StartDecor/startDecor';
import StartView from '../../modules/StartView/startView';
import Router from '../../router/router';
import { Pages } from '../../router/router-types';
import BaseElement from '../../ui/base-element/base-element';

export default class StartPage extends BaseElement {
  public startView: StartView;

  private router: Router;

  constructor(router: Router) {
    super({ tag: 'div', styles: ['start'] });
    this.startView = new StartView();
    this.router = router;
    this.addChildren([this.startView, new StartDecor()]);
    this.addHandler();
  }

  private addHandler(): void {
    this.startView.startBtn.setCallback('click', () => this.router.navigate(Pages.game));
  }
}
