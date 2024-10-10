import { BASE_LINK } from '../../../../const/const';
import BaseElement from '../../../../ui/base-element/base-element';
import { div, p } from '../../../../ui/base-tags/base-tags';
import './hintSentence.css';

export default class HintSentence extends BaseElement {
  private text: BaseElement;

  private audioIcon: BaseElement;

  private audioURL: string;

  private audioSound: HTMLAudioElement;

  constructor() {
    super({ styles: ['field__sentence', 'sentence'] });
    this.text = p({ styles: ['sentence__text'] });
    this.audioIcon = div({ styles: ['sentence__audio'] });
    this.audioURL = `${BASE_LINK}01_0601_example.mp3`;
    this.audioSound = new Audio(this.audioURL);
    this.addChildren([this.text, this.audioIcon]);
    this.audioIcon.setCallback('click', () => this.playAudio());
  }

  public setText(txt: string): void {
    this.text.setTextContent(txt);
  }

  public setAudio(url: string): void {
    this.audioURL = BASE_LINK + url;
  }

  public toggleTextVisibility(): void {
    this.text.toggleStyle('sentence__text--hide');
  }

  public toggleVolume(): void {
    this.audioIcon.toggleStyle('sentence__audio--hide');
    this.audioSound.pause();
  }

  private playAudio(): void {
    this.audioSound = new Audio(this.audioURL);
    this.audioSound.currentTime = 0;
    this.audioSound.play();
  }
}
