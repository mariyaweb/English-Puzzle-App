import BaseElement from '../../ui/base-element/base-element';
import { div, img } from '../../ui/base-tags/base-tags';
import logoImage from '../../../assets/logo.svg';
import './header.css';

export default class Header extends BaseElement {
  private logout: BaseElement;

  constructor() {
    super({ tag: 'header', styles: ['header'] });
    this.logout = div({ styles: ['header__logout', 'hidden'] });
    this.render();
  }

  private addLogo(): BaseElement {
    const logoContainer = div({ styles: ['logo', 'header__logo'] });
    const logo = img();
    logo.setAttribute('src', logoImage);
    logo.setAttribute('alt', 'logo');
    logoContainer.append(logo);
    return logoContainer;
  }

  private render(): void {
    const wrapper = div({ styles: ['wrapper', 'header__wrapper'] });
    const logo = this.addLogo();
    wrapper.addChildren([logo, this.logout]);
    this.append(wrapper);
  }
}
