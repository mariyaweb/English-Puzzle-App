import BaseElement from '../../../../../ui/base-element/base-element';
import { div } from '../../../../../ui/base-tags/base-tags';
import './taskItem.css';

export default class TaskItem extends BaseElement {
  constructor(rowItem: number) {
    super({ styles: ['tasks__item', 'row'] });
    this.addRowItems(rowItem);
  }

  public addRowItems(items: number): void {
    const widthItem = 620 / items;
    for (let i = 0; i < items; i += 1) {
      const item = div({ styles: ['row__item'] });
      item.setAttribute('style', `width: ${widthItem}px;`);
      this.append(item);
    }
  }
}
