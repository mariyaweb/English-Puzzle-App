import { randomSortArr } from '../../../../helpers/random-sort/random-sort';
import BaseElement from '../../../../ui/base-element/base-element';
import TasksList from '../TasksList/tasksList';
import TaskItem from '../TasksList/TaskItem/taskItem';
import OnePuzzle from './OnePuzzle/onePuzzle';
import './puzzles.css';
import { div, p } from '../../../../ui/base-tags/base-tags';
import { ShortLevelData } from '../../playingField-types';
import { GameSizeKey, GameSizeValue, IPuzzleBlocks, IPuzzleInfo } from './puzzles-types';

const CIRCRLE_RADIUS = 10;

const GAME_SIZES: Record<GameSizeKey, GameSizeValue> = {
  941: { pictureW: 800, pictureH: 450, puzzleH: 43.9, circleOffset: -12 },
  940: { pictureW: 700, pictureH: 395, puzzleH: 37.9, circleOffset: -8 },
  820: { pictureW: 600, pictureH: 338, puzzleH: 31.9, circleOffset: -5 },
};

export default class Puzzle extends BaseElement {
  public x: number;

  public y: number;

  public circleY: number;

  public initialPuzzles: IPuzzleInfo[];

  public randomPuzzles: IPuzzleInfo[];

  private tasks: TasksList;

  public gameSize: GameSizeValue;

  public puzzleBlocks: IPuzzleBlocks[];

  constructor(tasks: TasksList) {
    super({ styles: ['field__puzzle', 'puzzle'] });
    this.x = 0;
    this.y = 0;
    this.circleY = 0;
    this.initialPuzzles = [];
    this.randomPuzzles = [];
    this.puzzleBlocks = [];
    this.tasks = tasks;
    this.gameSize = this.getCurrentSizeGame();
  }

  public getCurrentSizeGame(width?: number): GameSizeValue {
    const windowWidth = width || window.innerWidth;
    if (windowWidth <= 820) {
      return GAME_SIZES[820];
    }
    if (windowWidth <= 940) {
      return GAME_SIZES[940];
    }
    return GAME_SIZES[941];
  }

  public createPuzzles(url: string, sentence: string, task: number): void {
    this.removeOldPuzzles();
    const wordsArr = sentence.split(' ');
    const lettersLength = wordsArr.join('').length;

    wordsArr.forEach((item, idx) => {
      const wordWidth = this.getWordLength(lettersLength, item.length, wordsArr.length);
      const currentPuzzle = new OnePuzzle(item, wordWidth, url, this.x, this.y, task, idx, this.gameSize.pictureW);
      currentPuzzle.puzzleItem.setCallback('click', this.movePuzzle);
      this.addPuzzleDetails(currentPuzzle, idx, wordsArr.length - 1, wordWidth);
      this.initialPuzzles.push({
        puzzle: currentPuzzle,
        size: wordWidth,
      });
      if (idx === wordsArr.length - 1) {
        this.puzzleBlocks.push({
          task,
          allPuzzles: this.initialPuzzles,
        });
      }
    });

    this.randomPuzzles = randomSortArr(this.initialPuzzles);
    const randomPuzzlesPuzzle = this.randomPuzzles.map((puzzle) => puzzle.puzzle);
    this.addChildren(randomPuzzlesPuzzle);
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
      this.circleY -= this.gameSize.puzzleH;
    } else {
      const circle = this.createCircleCoordinates(width);
      basePuzzle.createRightCircle(circle[0], circle[1]);
      basePuzzle.createLeftAperture();
    }
    this.changeCoordinates(width);
  }

  public changeCoordinates(width: number): void {
    const widthMove = (width * this.gameSize.pictureW) / 100;
    this.x -= widthMove;
  }

  public createCircleCoordinates(width: number): number[] {
    let moveX = (width * this.gameSize.pictureW) / 100;
    moveX = this.x - moveX + CIRCRLE_RADIUS;
    return [moveX, this.circleY];
  }

  public changePuzzleStyles(puzzleInfo: IPuzzleInfo, idx: number, task: number): void {
    if (idx === 0) {
      this.x = 0;
      this.y -= task * this.gameSize.puzzleH;
      this.circleY = this.gameSize.circleOffset + this.y;
      this.changeCircleStyles(puzzleInfo);
    } else if (idx === this.initialPuzzles.length - 1) {
      this.circleY -= this.gameSize.puzzleH;
    } else {
      this.changeCircleStyles(puzzleInfo);
    }
    puzzleInfo.puzzle.updateStyles(puzzleInfo.size, this.gameSize.pictureW, this.x, this.y);
    this.changeCoordinates(puzzleInfo.size);
  }

  private changeCircleStyles(puzzleInfo: IPuzzleInfo): void {
    const circleCoordinates = this.createCircleCoordinates(puzzleInfo.size);

    const circleEl = puzzleInfo.puzzle.children[0].children[1];
    const circleStyle = puzzleInfo.puzzle.createBackground(circleCoordinates[0], circleCoordinates[1]);
    circleEl.setAttribute('style', circleStyle);
  }

  private removeOldPuzzles(): void {
    this.htmlTag.innerHTML = '';
    this.x = 0;
    if (this.tasks.currentTask > 0) {
      this.y -= this.gameSize.puzzleH;
    } else {
      this.y = 0;
    }
    this.circleY = this.gameSize.circleOffset + this.y;
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
      const puzzleContainer = puzzleWord.puzzle.htmlTag;
      const initialData = puzzleWord.puzzle.children[0].getAttribute('data-puzzle');
      const isInitialPuzzlePosition = initialData === puzzleData;
      if (!puzzleContainer.hasChildNodes() && isInitialPuzzlePosition) {
        puzzleContainer.append(puzzle);
        row.columns[indexPuzzleContainer].puzzle = null;
        break;
      }
    }
  }

  public showPaintingInfo(data: ShortLevelData): void {
    const containerEl = div({ styles: ['puzzle__painting', 'painting'] });
    const nameEl = p({ styles: ['painting__text', 'painting__name'], text: data.name });
    const authorEl = p({ styles: ['painting__text', 'painting__author'], text: data.author });
    const yearEl = p({ styles: ['painting__text', 'painting__year'], text: data.year });
    containerEl.addChildren([nameEl, authorEl, yearEl]);
    this.append(containerEl);
  }
}
