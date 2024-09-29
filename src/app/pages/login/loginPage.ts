import LoginForm from '../../modules/LoginForm/loginForm';
import BaseElement from '../../ui/base-element/base-element';
import './loginPage.css';

export default class LoginPage extends BaseElement {
  constructor() {
    super({ tag: 'div', styles: ['login'] });
    this.addChildren([new LoginForm()]);
  }
}
