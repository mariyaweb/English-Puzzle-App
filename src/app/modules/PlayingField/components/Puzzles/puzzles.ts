import { randomSortArr } from '../../../../helpers/random-sort/random-sort';
import BaseElement from '../../../../ui/base-element/base-element';
import OnePuzzle from './OnePuzzle/onePuzzle';
import './puzzles.css';

export default class Puzzle extends BaseElement {
  private x: number;

  private y: number;

  private circleY: number;

  constructor() {
    super({ styles: ['field__puzzle', 'puzzle'] });
    this.x = 0;
    this.y = 0;
    this.circleY = -15;
  }

  public createPuzzles(url: string, sentence: string, task: number): void {
    this.removeOldPuzzles();
    const wordsArr = sentence.split(' ');
    const lettersLength = wordsArr.join('').length;
    const wordBasePuzzles: BaseElement[] = [];

    wordsArr.forEach((item, idx) => {
      const wordWidth = this.getWordLength(lettersLength, item.length, wordsArr.length);
      const currentPuzzle = new OnePuzzle(item, wordWidth, url, this.x, this.y, task, idx);
      this.addPuzzleDetails(currentPuzzle, idx, wordsArr.length - 1, wordWidth);
      wordBasePuzzles.push(currentPuzzle);
    });

    const randomPuzzlesArr = randomSortArr(wordBasePuzzles);
    this.addChildren(randomPuzzlesArr);
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
    moveX = this.x - moveX;
    return [moveX, this.circleY];
  }

  private removeOldPuzzles(): void {
    this.destroyChildren();
    this.x = 0;
    this.y = 0;
    this.circleY = -15;
  }
}
