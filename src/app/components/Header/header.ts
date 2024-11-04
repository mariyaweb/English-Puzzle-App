import BaseElement from '../../ui/base-element/base-element';
import { div, img } from '../../ui/base-tags/base-tags';
import logoImage from '../../../assets/logo.svg';
import './header.css';
import Router from '../../router/router';
import { Pages } from '../../router/router-types';

export default class Header extends BaseElement {
  public logout: BaseElement;

  private router: Router;

  constructor(router: Router) {
    super({ tag: 'header', styles: ['header'] });
    this.logout = div({ styles: ['header__logout', 'hidden'] });
    this.router = router;
    this.render();
  }

  private addLogo(): BaseElement {
    const logoContainer = div({ styles: ['logo', 'header__logo'] });
    const logo = img({ styles: ['logo__img'] });
    logo.setAttribute('src', logoImage);
    logo.setAttribute('alt', 'logo');
    logo.setCallback('click', () => this.router.navigate(Pages.start));
    logoContainer.append(logo);
    return logoContainer;
  }

  private render(): void {
    const wrapper = div({ styles: ['wrapper', 'header__wrapper'] });
    const logo = this.addLogo();
    this.logout.setCallback('click', this.logoutFn);
    wrapper.addChildren([logo, this.logout]);
    this.append(wrapper);
  }

  public update = (isLogged: boolean): void => {
    if (isLogged) {
      this.logout.removeStyle('hidden');
    } else {
      this.logout.addStyle('hidden');
    }
  };

  private logoutFn = (): void => {
    localStorage.removeItem('user');
    this.router.navigate(Pages.login);
  };
}
