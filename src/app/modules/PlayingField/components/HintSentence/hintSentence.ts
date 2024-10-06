import BaseElement from '../../../../ui/base-element/base-element';
import { div, p } from '../../../../ui/base-tags/base-tags';
import './hintSentence.css';

export default class HintSentence extends BaseElement {
  private text: BaseElement;

  private audio: BaseElement;

  constructor() {
    super({ styles: ['field__sentence', 'sentence'] });
    this.text = p({ styles: ['sentence__text'] });
    this.audio = div({ styles: ['sentence__audio'] });
    this.addChildren([this.text, this.audio]);
  }

  public setText(txt: string): void {
    this.text.setTextContent(txt);
  }
}
