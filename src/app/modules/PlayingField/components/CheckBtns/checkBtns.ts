import BaseElement from '../../../../ui/base-element/base-element';
import { button } from '../../../../ui/base-tags/base-tags';
import './checkBtns.css';

export default class CheckBtns extends BaseElement {
  public complete: BaseElement;

  public check: BaseElement;

  public continue: BaseElement;

  constructor() {
    super({ styles: ['field__checkBtns', 'checkBtns'] });
    this.complete = button({ styles: ['checkBtns__btn', 'checkBtns__complete'], text: 'Auto-Complete' });
    this.check = button({ styles: ['checkBtns__btn', 'checkBtns__check', 'disabled'], text: 'Check' });
    this.continue = button({ styles: ['checkBtns__btn', 'checkBtns__continue', 'hide'], text: 'Continue' });
    this.disabledCheckBtn();
    this.addChildren([this.complete, this.check, this.continue]);
  }

  public activeCheckBtn(): void {
    this.check.removeAttribute('disabled');
    this.check.removeStyle('disabled');
  }

  public disabledCheckBtn(): void {
    this.check.setAttribute('disabled', 'true');
    this.check.addStyle('disabled');
  }

  public showCheckBtn(): void {
    this.check.removeStyle('hide');
    this.continue.addStyle('hide');
  }

  public hideCheckBtn(): void {
    this.check.addStyle('hide');
    this.continue.removeStyle('hide');
  }
}
