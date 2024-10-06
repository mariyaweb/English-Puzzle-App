import BaseElement from '../../../../../ui/base-element/base-element';
import { div } from '../../../../../ui/base-tags/base-tags';
import './onePuzzle.css';

export default class OnePuzzle extends BaseElement {
  private puzzleItem: BaseElement;

  private itemStyle: string;

  private url: string;

  constructor(txt: string, widthContainer: number, url: string, positionX: number, positionY: number) {
    super({ styles: ['puzzle__container'] });
    this.puzzleItem = div({ styles: ['puzzle__item'], text: txt });
    this.url = url;
    this.itemStyle = this.createBackground(positionX, positionY);
    this.addChildren([this.puzzleItem]);
    this.createPuzzleStyles(widthContainer);
  }

  private createPuzzleStyles(width: number): void {
    this.setAttributes({
      style: ` width: ${width}%`,
      draggable: 'true',
    });

    this.puzzleItem.setAttributes({
      style: this.itemStyle,
    });
  }

  public createLeftAperture(): void {
    this.puzzleItem.addStyle('aperture');
  }

  public createRightCircle(positionX: number, positionY: number): void {
    const circle = div({ styles: ['puzzle__circle'] });
    circle.setAttributes({
      style: this.createBackground(positionX, positionY),
    });

    this.append(circle);
  }

  private createBackground(positionX: number, positionY: number): string {
    return `
      background-image: url(${this.url});
      background-position: ${positionX}px ${positionY}px;
    `;
  }
}
