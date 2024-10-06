import { IWord } from '../../../../api/getGameInfo-types';
import BaseElement from '../../../../ui/base-element/base-element';
import TaskItem from './TaskItem/taskItem';
import './tasksList.css';

export default class TasksList extends BaseElement {
  constructor() {
    super({ styles: ['field__tasks', 'tasks'] });
  }

  public addTaskRow(allSentences: IWord[]): void {
    allSentences.forEach((info) => {
      const countWordsInSentence = info.textExample.split(' ').length;
      this.append(new TaskItem(countWordsInSentence));
    });
  }
}
