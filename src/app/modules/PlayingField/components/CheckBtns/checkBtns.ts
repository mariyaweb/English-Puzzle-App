import BaseElement from '../../../../ui/base-element/base-element';
import { button } from '../../../../ui/base-tags/base-tags';
import './checkBtns.css';

export default class CheckBtns extends BaseElement {
  public complete: BaseElement;

  public check: BaseElement;

  public continue: BaseElement;

  public nextRound: BaseElement;

  constructor() {
    super({ styles: ['field__checkBtns', 'checkBtns'] });
    this.complete = button({ styles: ['checkBtns__btn', 'checkBtns__complete'], text: 'Auto-Complete' });
    this.check = button({ styles: ['checkBtns__btn', 'checkBtns__check', 'disabled'], text: 'Check' });
    this.continue = button({ styles: ['checkBtns__btn', 'checkBtns__continue', 'hide'], text: 'Continue' });
    this.nextRound = button({ styles: ['checkBtns__btn', 'checkBtns__round', 'hide'], text: 'Next Round' });
    this.disabledCheckBtn();
    this.addChildren([this.complete, this.check, this.continue, this.nextRound]);
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
    this.complete.removeStyle('hide');
    this.continue.addStyle('hide');
    this.nextRound.addStyle('hide');
  }

  public showContinueBtn(): void {
    this.continue.removeStyle('hide');
    this.check.addStyle('hide');
    this.nextRound.addStyle('hide');
  }

  public showNextRoundBtn(): void {
    this.nextRound.removeStyle('hide');
    this.continue.addStyle('hide');
    this.check.addStyle('hide');
    this.complete.addStyle('hide');
  }
}
