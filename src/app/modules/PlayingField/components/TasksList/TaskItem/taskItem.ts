import BaseElement from '../../../../../ui/base-element/base-element';
import { div } from '../../../../../ui/base-tags/base-tags';
import CheckBtns from '../../CheckBtns/checkBtns';
import OnePuzzle from '../../Puzzles/OnePuzzle/onePuzzle';
import Puzzle from '../../Puzzles/puzzles';
import { IColumn } from './taskItem-types';

import './taskItem.css';

export default class TaskItem extends BaseElement {
  public columns: IColumn[] = [];

  private checkBtns: CheckBtns;

  constructor(checkBtn: CheckBtns) {
    super({ styles: ['tasks__item', 'row'] });
    this.columns = [];
    this.checkBtns = checkBtn;
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
    const el = e.currentTarget as HTMLElement;
    el.classList.add('row__item--hover');
  }

  private dragOver(e: DragEvent): void {
    e.preventDefault();
  }

  private dragLeave(e: DragEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.classList.remove('row__item--hover');
  }

  private drop(e: DragEvent, item: BaseElement, columnNumber: number): void {
    e.preventDefault();
    const el = e.currentTarget as HTMLElement;
    el.classList.remove('row__item--hover');
    const insertColumn = this.columns[columnNumber];
    const colWithoutPuzzle = !insertColumn.puzzle;

    if (e.dataTransfer) {
      /* Получаем инфу о перемещаемом элементе */
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const puzzleId = data.id;
      const prevParent = data.parentData;
      const puzzleEl = document.querySelector(`[data-puzzle="${puzzleId}"]`);

      if (colWithoutPuzzle && puzzleEl) {
        this.movingToEmptyColumn(columnNumber, puzzleEl, prevParent);
      } else if (puzzleEl) {
        this.movingToFillColumn(columnNumber, insertColumn, puzzleEl, prevParent);
      }
    }
    this.checkFillRow();
  }

  public checkFillRow(): void {
    this.removeAllCheckStyles();
    const isFill = this.columns.every((column) => column.puzzle);
    if (isFill) {
      this.checkBtns.activeCheckBtn();
      this.checkBtns.check.setCallback('click', this.checkSentence);
    } else {
      this.checkBtns.disabledCheckBtn();
    }
  }

  private checkSentence = (): void => {
    const isCorrectSentence = this.isCorrectSentence();
    if (isCorrectSentence) {
      this.checkBtns.hideCheckBtn();
      this.addStyle('row--correct');
    } else {
      this.showIncorrectWords();
    }
  };

  private showIncorrectWords(): void {
    this.removeAllCheckStyles();
    this.columns.forEach((columnInfo, index) => {
      const puzzleEl = columnInfo.puzzle;
      if (puzzleEl && this.getPuzzlePosition(puzzleEl) === index) {
        columnInfo.column.addStyle('correct');
      } else {
        columnInfo.column.addStyle('incorrect');
      }
    });
  }

  public removeAllCheckStyles(): void {
    this.columns.forEach((columnInfo) => {
      columnInfo.column.removeStyles(['correct', 'incorrect']);
    });
  }

  public autoCompleteRow(puzzleBlock: Puzzle): void {
    const initialPuzzle = puzzleBlock.initialPuzzles;
    const { movePuzzle } = puzzleBlock;
    this.moveAllPuzzleToPuzzleBlock(puzzleBlock);
    this.moveAllPuzzleToRow(initialPuzzle, movePuzzle);
    this.addStyle('row--incorrect');
  }

  private moveAllPuzzleToPuzzleBlock(puzzleBlock: Puzzle): void {
    this.columns.forEach((column, index) => {
      const columnTag = column.column.htmlTag;
      const { puzzle } = column;
      const puzzleData = puzzle?.getAttribute('data-puzzle');
      if (columnTag.classList.contains('row__item--fill') && puzzle && puzzleData) {
        puzzleBlock.moveToPuzzleField(puzzle as Element, puzzleData, this, index);
      }
    });
  }

  private moveAllPuzzleToRow(initialPuzzle: OnePuzzle[], movePuzzle: (e: Event) => void): void {
    this.columns.forEach((_, index) => {
      const correctPuzzle = initialPuzzle[index];
      const correctPuzzleEl = correctPuzzle.htmlTag;
      const correctPuzzleItem = correctPuzzle.puzzleItem;
      correctPuzzleItem.removeAttribute('draggable');
      correctPuzzleItem.removeCallback('click', movePuzzle);
      this.addToCol(index, correctPuzzleEl);
    });
  }

  private isCorrectSentence(): boolean {
    const res = this.columns.every((column, index) => {
      const { puzzle } = column;
      return puzzle ? this.getPuzzlePosition(puzzle) === index : false;
    });
    return res;
  }

  private getPuzzlePosition(puzzle: Element | BaseElement): number {
    const wordPosition = puzzle.getAttribute('data-puzzle');
    return wordPosition ? +wordPosition.slice(-1) : -1;
  }

  private movingToFillColumn(
    toColumnIndex: number,
    toColumnElement: IColumn,
    puzzle: Element,
    columnFrom: number | null,
  ): void {
    const emptyIdx = this.getNearestEmptyCol(toColumnIndex);

    if (!columnFrom) {
      const offset = emptyIdx - toColumnIndex;
      this.shiftPuzzles(toColumnIndex, offset, puzzle);
    } else {
      this.swapPuzzles(columnFrom, toColumnElement);
    }
  }

  private movingToEmptyColumn(toColumnIndex: number, puzzle: Element, columnFrom: number | null): void {
    if (!columnFrom) {
      this.addToCol(toColumnIndex, puzzle);
    } else {
      this.addToCol(toColumnIndex, puzzle);
      this.cleanPreviousColumn(columnFrom);
    }
  }

  private cleanPreviousColumn(columnIdx: number): void {
    const prevColumn = this.columns[columnIdx];
    prevColumn.column.destroyChildren();
    prevColumn.column.removeStyle('row__item--fill');
    prevColumn.puzzle = null;
  }

  public addToCol(columnIdx: number, puzzle: Element): void {
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

  public getFirstEmptyColumn(): number {
    const indexEmptyColumn = this.columns.findIndex((columnInfo) => !columnInfo.puzzle);
    return indexEmptyColumn;
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

  public saveRow(): void {
    const innerContent = this.htmlTag.innerHTML;
    this.setTextContent(innerContent);
  }
}
