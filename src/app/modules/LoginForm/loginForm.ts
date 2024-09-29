import BaseElement from '../../ui/base-element/base-element';
import { button, div, form, h2 } from '../../ui/base-tags/base-tags';
import LoginInputs from './components/LoginInputs/loginInputs';
import LoginImg from './components/LoginImg/loginImg';
import './loginForm.css';

export default class LoginForm extends BaseElement {
  private wrapper: BaseElement;

  private form: BaseElement;

  private header: BaseElement;

  private inputs: BaseElement;

  private btn: BaseElement;

  private imgMan: BaseElement;

  constructor() {
    super({ tag: 'div', styles: ['loginForm'] });
    this.wrapper = div({ styles: ['wrapper', 'loginForm__wrapper'] });
    this.form = form({ styles: ['loginForm__form'] });
    this.header = h2({ text: 'Welcome!', styles: ['loginForm__header'] });
    this.inputs = new LoginInputs();
    this.btn = button({ text: 'Log in', styles: ['btn', 'loginForm__btn'] });
    this.imgMan = new LoginImg();

    this.wrapper.addChildren([this.form, this.imgMan]);
    this.form.addChildren([this.header, this.inputs, this.btn]);
    this.append(this.wrapper);
  }
}
