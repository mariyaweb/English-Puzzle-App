import BaseElement from '../../../../ui/base-element/base-element';
import { div, img } from '../../../../ui/base-tags/base-tags';
import decorLine from '../../../../../assets/img/decorLine.svg';
import womanImg from '../../../../../assets/img/woman.png';

export default class StartDecor extends BaseElement {
  private line: BaseElement;

  private womanImgContainer: BaseElement;

  private womanImg: BaseElement;

  constructor() {
    super({ tag: 'div', styles: ['start__decor'] });
    this.line = img({});
    this.line.setAttributes({ src: decorLine, alt: 'decor line' });

    this.womanImgContainer = div({ styles: ['start__woman'] });
    this.womanImg = img();
    this.womanImg.setAttributes({ src: womanImg, alt: 'woman' });
    this.womanImgContainer.append(this.womanImg);
    this.addChildren([this.line, this.womanImgContainer]);
  }

  showImage() {
    this.womanImgContainer.removeStyle('hide');
  }

  hideImage() {
    this.womanImgContainer.addStyle('hide');
  }
}
