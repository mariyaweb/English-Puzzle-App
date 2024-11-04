import BaseElement from '../../ui/base-element/base-element';
import { button, div, form, h2 } from '../../ui/base-tags/base-tags';
import LoginInputs from './components/LoginInputs/loginInputs';
import LoginImg from './components/LoginImg/loginImg';
import './loginForm.css';
import Router from '../../router/router';
import { Pages } from '../../router/router-types';

export default class LoginForm extends BaseElement {
  private router: Router;

  private wrapper: BaseElement;

  private form: BaseElement;

  private header: BaseElement;

  private inputs: LoginInputs;

  private btn: BaseElement;

  private imgMan: BaseElement;

  constructor(router: Router) {
    super({ tag: 'div', styles: ['loginForm'] });
    this.router = router;
    this.wrapper = div({ styles: ['wrapper', 'loginForm__wrapper'] });
    this.form = form({ styles: ['loginForm__form'] });
    this.header = h2({ text: 'Welcome!', styles: ['loginForm__header'] });
    this.btn = button({ text: 'Log in', styles: ['btn', 'loginForm__btn'] });
    this.inputs = new LoginInputs(this.btn);
    this.imgMan = new LoginImg();

    this.wrapper.addChildren([this.form, this.imgMan]);
    this.form.addChildren([this.header, this.inputs, this.btn]);
    this.append(this.wrapper);
    this.addHandler();
  }

  private addHandler(): void {
    this.btn.setCallback('click', this.sendForm);
  }

  private sendForm = (e: Event): void => {
    e.preventDefault();
    if (this.btn.containsClass('loginForm__btn--active')) {
      const userData = { name: this.inputs.inputNameValue, surname: this.inputs.inputSurnameValue };
      localStorage.setItem('user', JSON.stringify(userData));
      this.router.navigate(Pages.start);
      this.cleanForm();
    }
  };

  private cleanForm(): void {
    this.inputs.cleanInputs();
    this.inputs.submitButton.removeStyle('loginForm__btn--active');
  }
}
