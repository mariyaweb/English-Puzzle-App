import { BASE_IMG_LINK } from '../../../../../../const/const';
import { randomSortArr } from '../../../../../../helpers/random-sort/random-sort';
import BaseElement from '../../../../../../ui/base-element/base-element';
import { div } from '../../../../../../ui/base-tags/base-tags';
import './roundItem.css';

export default class RoundItem extends BaseElement {
  private number: BaseElement;

  private image: BaseElement;

  private words: BaseElement;

  constructor(url: string, sentence: string, currentRound: number) {
    super({ tag: 'li', styles: ['rounds__item', 'round'], attributes: { 'data-round': currentRound } });
    this.number = div({ styles: ['round__number'], text: `${currentRound + 1}` });
    this.image = div({
      styles: ['round__img'],
      attributes: {
        style: `background-image: url(${BASE_IMG_LINK + url});`,
      },
    });
    this.words = this.createWords(sentence);
    this.addChildren([this.number, this.image, this.words]);
  }

  private createWords(sentence: string): BaseElement {
    const wordsBlock = div({ styles: ['round__words'] });
    const wordsArr = sentence.split(' ');
    randomSortArr(wordsArr);
    wordsArr.forEach((word) => {
      wordsBlock.append(div({ styles: ['round__word'], text: word }));
    });
    return wordsBlock;
  }
}
