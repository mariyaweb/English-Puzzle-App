import LoginForm from '../../modules/LoginForm/loginForm';
import Router from '../../router/router';
import BaseElement from '../../ui/base-element/base-element';
import './loginPage.css';

export default class LoginPage extends BaseElement {
  constructor(router: Router) {
    super({ tag: 'div', styles: ['login'] });
    this.addChildren([new LoginForm(router)]);
  }
}
