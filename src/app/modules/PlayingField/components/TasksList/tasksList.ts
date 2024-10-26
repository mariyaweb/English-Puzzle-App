import { IWord } from '../../../../api/getGameInfo-types';
import BaseElement from '../../../../ui/base-element/base-element';
import TaskItem from './TaskItem/taskItem';
import './tasksList.css';

export default class TasksList extends BaseElement {
  private tasksList: IWord[];

  private currentTask: number;

  constructor() {
    super({ styles: ['field__tasks', 'tasks'] });
    this.tasksList = [];
    this.currentTask = 0;
    this.createEmptyRows();
  }

  public addTaskRow(currentTask: number): void {
    this.currentTask = currentTask;
    const countWordsInSentence = this.tasksList[this.currentTask].textExample.split(' ').length;
    const currentRow = this.children[this.currentTask] as TaskItem;
    currentRow.addStyle('row--active');
    currentRow.addRowItems(countWordsInSentence);
    // console.log(this.);
    //  console.log(this.children[0].);

    // создать игровой ряд
    // добавить активный

    // this.destroyChildren();
    // allSentences.forEach((info) => {
    //   const countWordsInSentence = info.textExample.split(' ').length;
    //   this.append(new TaskItem(countWordsInSentence));
    // });
  }

  private createEmptyRows(): void {
    for (let row = 0; row < 10; row += 1) {
      this.append(new TaskItem());
    }
  }

  public setTaskList(list: IWord[]): void {
    this.tasksList = list;
  }

  private removeTaskList(): void {
    this.children.forEach((child) => {
      child.destroyChildren();
    });
  }
}
