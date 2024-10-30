import { randomSortArr } from '../../../../helpers/random-sort/random-sort';
import BaseElement from '../../../../ui/base-element/base-element';
import TasksList from '../TasksList/tasksList';
import TaskItem from '../TasksList/TaskItem/taskItem';
import OnePuzzle from './OnePuzzle/onePuzzle';
import './puzzles.css';

const PUZZLE_HEIGHT = 48.9;
const CIRCRLE_OFFSET_Y = -15;
const CIRCRLE_RADIUS = 10;

export default class Puzzle extends BaseElement {
  private x: number;

  private y: number;

  private circleY: number;

  public initialPuzzles: OnePuzzle[];

  public randomPuzzles: BaseElement[];

  private tasks: TasksList;

  constructor(tasks: TasksList) {
    super({ styles: ['field__puzzle', 'puzzle'] });
    this.x = 0;
    this.y = 0;
    this.circleY = 0;
    this.initialPuzzles = [];
    this.randomPuzzles = [];
    this.tasks = tasks;
  }

  public createPuzzles(url: string, sentence: string, task: number): void {
    this.removeOldPuzzles();
    const wordsArr = sentence.split(' ');
    const lettersLength = wordsArr.join('').length;

    wordsArr.forEach((item, idx) => {
      const wordWidth = this.getWordLength(lettersLength, item.length, wordsArr.length);
      const currentPuzzle = new OnePuzzle(item, wordWidth, url, this.x, this.y, task, idx);
      currentPuzzle.puzzleItem.setCallback('click', this.movePuzzle);
      this.addPuzzleDetails(currentPuzzle, idx, wordsArr.length - 1, wordWidth);
      this.initialPuzzles.push(currentPuzzle);
    });

    this.randomPuzzles = randomSortArr(this.initialPuzzles);
    this.addChildren(this.randomPuzzles);
  }

  private getWordLength(sentenceLength: number, wordLength: number, totalWords: number): number {
    const minWidthWord = (wordLength / sentenceLength) * (100 - 5 * totalWords) + 5;
    return minWidthWord;
  }

  private addPuzzleDetails(basePuzzle: OnePuzzle, idx: number, wordsCount: number, width: number): void {
    if (idx === 0) {
      const circle = this.createCircleCoordinates(width);
      basePuzzle.createRightCircle(circle[0], circle[1]);
    } else if (idx === wordsCount) {
      basePuzzle.createLeftAperture();
      this.circleY -= 49;
    } else {
      const circle = this.createCircleCoordinates(width);
      basePuzzle.createRightCircle(circle[0], circle[1]);
      basePuzzle.createLeftAperture();
    }
    this.changeCoordinates(width);
  }

  private changeCoordinates(width: number): void {
    const widthMove = (width * 900) / 100;
    this.x -= widthMove;
  }

  private createCircleCoordinates(width: number): number[] {
    let moveX = (width * 900) / 100;
    moveX = this.x - moveX + CIRCRLE_RADIUS;
    return [moveX, this.circleY];
  }

  private removeOldPuzzles(): void {
    this.destroyChildren();
    this.x = 0;
    if (this.tasks.currentTask > 0) {
      this.y -= PUZZLE_HEIGHT;
    } else {
      this.y = 0;
    }
    this.circleY = CIRCRLE_OFFSET_Y + this.y;
    this.initialPuzzles = [];
    this.randomPuzzles = [];
  }

  public movePuzzle = (e: Event): void => {
    const puzzle = e.currentTarget as Element;
    const puzzleData = puzzle.getAttribute('data-puzzle');
    const puzzleContainer = puzzle.parentElement;
    const indexPuzzleContainer = Number(puzzleContainer?.getAttribute('data-col'));
    const isSourceBlock = puzzleContainer?.classList.contains('puzzle__container');
    const currentRow = this.tasks.getCurrentTaskRow();
    if (isSourceBlock && puzzle) {
      this.moveToRow(puzzle, currentRow);
    } else if (puzzle && puzzleData && indexPuzzleContainer >= 0) {
      this.moveToPuzzleField(puzzle, puzzleData, currentRow, indexPuzzleContainer);
      puzzleContainer?.classList.remove('row__item--fill');
    }
    currentRow.checkFillRow();
  };

  private moveToRow(puzzle: Element, row: TaskItem): void {
    const indexFirstEmptyCol = row.getFirstEmptyColumn();
    row.addToCol(indexFirstEmptyCol, puzzle);
  }

  public moveToPuzzleField(puzzle: Element, puzzleData: string, row: TaskItem, indexPuzzleContainer: number): void {
    for (let i = 0; i < this.randomPuzzles.length; i += 1) {
      const puzzleWord = this.randomPuzzles[i];
      const puzzleContainer = puzzleWord.htmlTag;
      const initialData = puzzleWord.children[0].getAttribute('data-puzzle');
      const isInitialPuzzlePosition = initialData === puzzleData;
      if (!puzzleContainer.hasChildNodes() && isInitialPuzzlePosition) {
        puzzleContainer.append(puzzle);
        row.columns[indexPuzzleContainer].puzzle = null;
        break;
      }
    }
  }
}
