import { IWord } from '../../api/getGameInfo-types';
import BaseElement from '../../ui/base-element/base-element';
import { button, div } from '../../ui/base-tags/base-tags';
import { ShortLevelData } from '../PlayingField/playingField-types';
import PictureInfo from './components/PictureInfo/pictureInfo';
import SentenceList from './components/SentenceList/sentenceList';
import { StyleName } from './results-types';
import './results.css';

export default class Results extends BaseElement {
  private wrapper: BaseElement;

  private pictureInfo: PictureInfo;

  private listContainer: BaseElement;

  public continueBtn: BaseElement;

  private doneList: SentenceList;

  private noDoneList: SentenceList;

  constructor() {
    super({ styles: ['results'] });
    this.wrapper = div({ styles: ['results__wrapper'] });
    this.pictureInfo = new PictureInfo();
    this.listContainer = div({ styles: ['results__sentences', 'sentences'] });
    this.doneList = new SentenceList(StyleName.DONE_LIST);
    this.noDoneList = new SentenceList(StyleName.NO_DONE_LIST);
    this.continueBtn = button({ styles: ['results__continue'], text: 'Continue' });
    this.listContainer.addChildren([this.doneList, this.noDoneList]);
    this.wrapper.addChildren([this.pictureInfo, this.listContainer, this.continueBtn]);
    this.addChildren([this.wrapper]);
  }

  public showWindow(roundData: ShortLevelData, tasks: IWord[], resultTask: boolean[]): void {
    this.addStyle('results--active');
    this.pictureInfo.setPicture(roundData);
    tasks.forEach((task, index) => {
      if (resultTask[index]) {
        this.doneList.addSentence(task.textExample, task.audioExample);
      } else {
        this.noDoneList.addSentence(task.textExample, task.audioExample);
      }
    });
  }

  public hideWindow(): void {
    this.removeStyle('results--active');
    this.doneList.list.destroyChildren();
    this.noDoneList.list.destroyChildren();
  }
}
