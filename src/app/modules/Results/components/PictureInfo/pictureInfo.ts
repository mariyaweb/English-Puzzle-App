import { BASE_IMG_LINK } from '../../../../const/const';
import BaseElement from '../../../../ui/base-element/base-element';
import { div, p } from '../../../../ui/base-tags/base-tags';
import { ShortLevelData } from '../../../PlayingField/playingField-types';

export default class PictureInfo extends BaseElement {
  private pictureImg: BaseElement;

  private nameEl: BaseElement;

  constructor() {
    super({ styles: ['results__picture', 'picture'] });
    this.pictureImg = div({ styles: ['picture__img'] });
    this.nameEl = p({ styles: ['picture__text'] });
    this.addChildren([this.pictureImg, this.nameEl]);
    this.setPicture({
      name: 'Stag Hunt',
      cutSrc: 'level1/cut/deerhunt.jpg',
      author: "Niccolò dell'",
      year: '1550-52',
    });
  }

  public setPicture(data: ShortLevelData): void {
    this.pictureImg.setAttribute('style', `background-image: url(${BASE_IMG_LINK + data.cutSrc});`);
    this.nameEl.setTextContent(`${data.name} - ${data.author} (${data.year})`);
  }
}
