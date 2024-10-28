import BaseElement from '../../../../ui/base-element/base-element';
import { button } from '../../../../ui/base-tags/base-tags';
import './checkBtns.css';

export default class CheckBtns extends BaseElement {
  public complete: BaseElement;

  public check: BaseElement;

  constructor() {
    super({ styles: ['field__checkBtns', 'checkBtns'] });
    this.complete = button({ styles: ['checkBtns__btn', 'checkBtns__complete'], text: 'Auto-Complete' });
    this.check = button({ styles: ['checkBtns__btn', 'checkBtns__check', 'disabled'], text: 'Check' });
    this.disabledCheckBtn();
    this.addChildren([this.complete, this.check]);
  }

  public activeCheckBtn(): void {
    this.check.removeAttribute('disabled');
    this.check.removeStyle('disabled');
  }

  private disabledCheckBtn(): void {
    this.check.setAttribute('disabled', 'true');
    this.check.addStyle('disabled');
  }
}
