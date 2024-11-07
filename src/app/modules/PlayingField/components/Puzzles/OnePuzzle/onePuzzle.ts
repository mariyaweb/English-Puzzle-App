import BaseElement from '../../../../../ui/base-element/base-element';
import { div } from '../../../../../ui/base-tags/base-tags';
import './onePuzzle.css';

export default class OnePuzzle extends BaseElement {
  public puzzleItem: BaseElement;

  private puzzleBody: BaseElement;

  private itemStyle: string;

  private url: string;

  private widthPicture: number;

  constructor(
    txt: string,
    widthContainer: number,
    url: string,
    positionX: number,
    positionY: number,
    task: number,
    index: number,
    widthPicture: number,
  ) {
    super({ styles: ['puzzle__container'] });
    this.widthPicture = widthPicture;
    this.puzzleItem = div({ styles: ['puzzle__item'] });
    this.puzzleBody = div({ styles: ['puzzle__body'], text: txt });
    this.url = url;
    this.itemStyle = this.createBackground(positionX, positionY);
    this.addChildren([this.puzzleItem]);
    this.puzzleItem.addChildren([this.puzzleBody]);
    this.createPuzzleStyles(widthContainer, task, index);
    this.addHandlers();
  }

  private createPuzzleStyles(width: number, task: number, index: number): void {
    const widthPx = (width * this.widthPicture) / 100;
    this.puzzleItem.setAttributes({
      style: `min-width: ${widthPx}px; max-width: ${widthPx}px`,
      draggable: 'true',
      'data-puzzle': `${task}-${index}`,
    });

    this.setAttributes({
      style: `min-width: ${widthPx}px; max-width: ${widthPx}px`,
    });

    this.puzzleBody.setAttributes({
      style: this.itemStyle,
    });
  }

  public createLeftAperture(): void {
    this.puzzleBody.addStyle('aperture');
  }

  public createRightCircle(positionX: number, positionY: number): void {
    const circle = div({ styles: ['puzzle__circle'] });
    circle.setAttributes({
      style: this.createBackground(positionX, positionY),
    });

    this.puzzleItem.append(circle);
  }

  public createBackground(positionX: number, positionY: number): string {
    return `
      background-image: url(${this.url});
      background-position: ${positionX}px ${positionY}px;
    `;
  }

  private addHandlers(): void {
    this.puzzleItem.setCallback('dragstart', (e: Event) => this.dragStart(e as DragEvent));
  }

  private dragStart(e: DragEvent): void {
    const el = e.currentTarget as HTMLElement;
    const data = {
      id: el.getAttribute('data-puzzle'),
      parentData: el.parentElement?.dataset.col,
    };
    if (e && e.currentTarget && data) {
      e.dataTransfer?.setData('application/json', JSON.stringify(data));
    }
  }

  public updateStyles(wordWidth: number, newWidthPicture: number, positionX: number, positionY: number): void {
    this.widthPicture = newWidthPicture;
    const widthPx = (wordWidth * this.widthPicture) / 100;
    this.setAttributes({
      style: `min-width: ${widthPx}px; max-width: ${widthPx}px`,
    });

    this.puzzleItem.setAttributes({
      style: `min-width: ${widthPx}px; max-width: ${widthPx}px`,
    });

    this.itemStyle = this.createBackground(positionX, positionY);

    this.puzzleBody.setAttributes({
      style: this.itemStyle,
    });
  }
}
