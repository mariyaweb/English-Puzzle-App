import { IWord } from '../../../../api/getGameInfo-types';
import BaseElement from '../../../../ui/base-element/base-element';
import CheckBtns from '../CheckBtns/checkBtns';
import TaskItem from './TaskItem/taskItem';
import './tasksList.css';

export default class TasksList extends BaseElement {
  private tasksList: IWord[];

  public currentTask: number;

  private checkBtns: CheckBtns;

  public currentTaskRows: TaskItem[];

  constructor(checkBtns: CheckBtns) {
    super({ styles: ['field__tasks', 'tasks'] });
    this.tasksList = [];
    this.currentTask = 0;
    this.checkBtns = checkBtns;
    this.currentTaskRows = [];
    this.createEmptyRows();
  }

  public addTaskRow(currentTask: number): void {
    this.currentTask = currentTask;
    const countWordsInSentence = this.tasksList[this.currentTask].textExample.split(' ').length;
    const currentRow = this.children[this.currentTask] as TaskItem;
    if (this.currentTask > 0) {
      this.children[this.currentTask - 1].removeStyle('row--active');
    }
    currentRow.addStyle('row--active');
    currentRow.addRowItems(countWordsInSentence);
  }

  private createEmptyRows(): void {
    for (let row = 0; row < 10; row += 1) {
      const item = new TaskItem(this.checkBtns);
      this.currentTaskRows.push(item);
      this.append(item);
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

  public getCurrentTaskRow(): TaskItem {
    return this.currentTaskRows[this.currentTask];
  }
}
