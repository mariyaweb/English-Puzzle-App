import BaseElement from '../../../../../ui/base-element/base-element';
import { div } from '../../../../../ui/base-tags/base-tags';
import { IColumn } from './taskItem-types';

import './taskItem.css';

export default class TaskItem extends BaseElement {
  public columns: IColumn[] = [];

  constructor() {
    super({ styles: ['tasks__item', 'row'] });
    this.columns = [];
  }

  public addRowItems(items: number): void {
    for (let i = 0; i < items; i += 1) {
      const item = div({
        styles: ['row__item'],
        attributes: {
          'data-col': i,
        },
      });
      this.columns.push({
        number: i,
        column: item,
        puzzle: null,
      });
      this.addHandlers(item, i);
      this.append(item);
    }
  }

  private addHandlers(item: BaseElement, index: number): void {
    item.setCallback('dragenter', (e: Event) => this.dragEnter(e as DragEvent));
    item.setCallback('dragover', (e: Event) => this.dragOver(e as DragEvent));
    item.setCallback('dragleave', (e: Event) => this.dragLeave(e as DragEvent));
    item.htmlTag.addEventListener('drop', (e: Event) => this.drop(e as DragEvent, item, index));
  }

  private dragEnter(e: DragEvent): void {
    const el = e.target as HTMLElement;
    el.classList.add('row__item--hover');
  }

  private dragOver(e: DragEvent): void {
    e.preventDefault();
  }

  private dragLeave(e: DragEvent): void {
    const el = e.target as HTMLElement;
    el.classList.remove('row__item--hover');
  }

  private drop(e: DragEvent, item: BaseElement, columnNumber: number): void {
    e.preventDefault();
    const insertColumn = this.columns[columnNumber];
    const colWithPuzzle = !insertColumn.puzzle;

    if (e.dataTransfer) {
      /* Получаем инфу о перемещаемом элементе */
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const puzzleId = data.id;
      const prevParent = data.parentData;
      const puzzleEl = document.querySelector(`[data-puzzle="${puzzleId}"]`);

      if (colWithPuzzle && puzzleEl) {
        // место для пазла свободно
        if (!prevParent) {
          // перемещение снизу
          this.addToCol(columnNumber, puzzleEl);
        } else {
          // перемещение внутри row
          this.addToCol(columnNumber, puzzleEl);
          const prevColumn = this.columns[prevParent];
          prevColumn.column.destroyChildren();
          prevColumn.column.removeStyle('row__item--fill');
          prevColumn.puzzle = null;
        }
      } else {
        // пазл занят
        const emptyIdx = this.getNearestEmptyCol(columnNumber);

        if (!prevParent && puzzleEl) {
          // перемещение снизу
          const offset = emptyIdx - columnNumber;
          this.shiftPuzzles(columnNumber, offset, puzzleEl);
        } else {
          // перемещение внутри row
          this.swapPuzzles(prevParent, insertColumn);
        }
      }
    }
  }

  private addToCol(columnIdx: number, puzzle: Element): void {
    const columnInfo = this.columns[columnIdx];
    const columnEl = columnInfo.column;
    columnInfo.puzzle = puzzle;
    columnEl.htmlTag.append(puzzle);
    columnEl.removeStyle('row__item--hover');
    columnEl.addStyle('row__item--fill');
  }

  private getNearestEmptyCol(startIdx: number): number {
    const columnsLength = this.columns.length;
    for (let offset = 0; offset < columnsLength; offset += 1) {
      const leftIdx = startIdx - offset;
      const rightIdx = startIdx + offset;

      if (leftIdx >= 0 && !this.columns[leftIdx].puzzle) {
        return leftIdx;
      }

      if (rightIdx < columnsLength && !this.columns[rightIdx].puzzle) {
        return rightIdx;
      }
    }

    return -1;
  }

  private shiftPuzzles(insertIdx: number, offset: number, puzzle: Element): void {
    const emptyIdx = insertIdx + offset;
    const direction = offset < 0 ? 1 : -1;
    const isForward = direction === 1;
    for (let i = emptyIdx; isForward ? i < insertIdx : i > insertIdx; i += direction) {
      const currColumn = this.columns[i].column;
      currColumn.destroyContent();
      currColumn.htmlTag.append(this.columns[i + direction].puzzle as Node);
      this.columns[i].puzzle = this.columns[i + direction].puzzle;
      currColumn.removeStyle('row__item--hover');
      currColumn.removeStyle('row__item--hover');
    }
    this.columns[emptyIdx].column.addStyle('row__item--fill');
    const insertColumn = this.columns[insertIdx];
    insertColumn.column.removeStyle('row__item--hover');
    insertColumn.column.htmlTag.append(puzzle);
    insertColumn.puzzle = puzzle;
  }

  private swapPuzzles(columnFrom: number, columnTo: IColumn): void {
    const prevColumn = this.columns[columnFrom];
    const insertPuzzle = columnTo.puzzle;
    const prevPuzzle = prevColumn.puzzle;
    columnTo.column.htmlTag.replaceChildren(prevPuzzle as Node);
    prevColumn.column.htmlTag.replaceChildren(insertPuzzle as Node);
    prevColumn.puzzle = insertPuzzle;
    columnTo.puzzle = prevPuzzle;
  }
}
