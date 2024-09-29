import BaseElement from '../../../../ui/base-element/base-element';
import { img } from '../../../../ui/base-tags/base-tags';
import urlManImg from '../../../../../assets/img/man.png';
import './loginImg.css';

export default class LoginImg extends BaseElement {
  private imgMan: BaseElement;

  constructor() {
    super({ styles: ['loginForm__img'] });
    this.imgMan = img({
      attributes: {
        src: urlManImg,
        alt: 'man image',
      },
    });
    this.append(this.imgMan);
  }
}
