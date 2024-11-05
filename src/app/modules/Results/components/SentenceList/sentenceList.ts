import { BASE_LINK } from '../../../../const/const';
import BaseElement from '../../../../ui/base-element/base-element';
import { div, h3, li, p, ul } from '../../../../ui/base-tags/base-tags';
import { StyleName, TitleName } from '../../results-types';
import './sentenceList.css';

const TITLE_NAMES: TitleName = {
  [StyleName.DONE_LIST]: 'I know',
  [StyleName.NO_DONE_LIST]: "I don't know",
};

export default class SentenceList extends BaseElement {
  private title: BaseElement;

  public list: BaseElement;

  constructor(styleName: StyleName) {
    super({ styles: ['sentences__list', `sentences__${styleName}`] });
    this.title = h3({ styles: ['sentences__title'] });
    this.title.setTextContent(TITLE_NAMES[styleName]);
    this.list = ul({ styles: ['sentences__items'] });
    this.addChildren([this.title, this.list]);
  }

  public addSentence(sentence: string, url: string): void {
    const item = li({ styles: ['sentences__sentence'] });
    const audioIcon = div({ styles: ['sentences__audio'] });
    const text = p({ styles: ['sentences__text'], text: sentence });
    const audioURL = BASE_LINK + url;
    const audioSound = new Audio(audioURL);
    audioIcon.setCallback('click', () => this.playAudio(audioSound));
    item.addChildren([audioIcon, text]);
    this.list.append(item);
  }

  private playAudio(audioSound: HTMLAudioElement): void {
    audioSound.currentTime = 0;
    audioSound.play();
  }
}
