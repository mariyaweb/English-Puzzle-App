import BaseElement from '../../../../ui/base-element/base-element';
import { button } from '../../../../ui/base-tags/base-tags';
import './levels.css';

export default class Levels extends BaseElement {
  constructor() {
    super({ styles: ['select__levels'] });
    this.createLevelsBtn();
  }

  private createLevelsBtn(): void {
    for (let i = 0; i < 6; i += 1) {
      const btn = button({
        styles: ['btn', 'select__btn'],
        text: `Level ${i + 1}`,
        attributes: {
          'data-level': i + 1,
        },
      });
      if (i === 0) {
        btn.addStyle('select__btn--selected');
      }
      this.append(btn);
    }
  }
}
