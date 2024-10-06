import BaseElement from '../../../../ui/base-element/base-element';
import { button } from '../../../../ui/base-tags/base-tags';
import './settingsList.css';

export default class SettingsList extends BaseElement {
  private clue: BaseElement;

  private volume: BaseElement;

  private picture: BaseElement;

  constructor() {
    super({ styles: ['settings__list'] });
    this.clue = button({ styles: ['settings__btn', 'settings__clue', 'btn'] });
    this.volume = button({ styles: ['settings__btn', 'settings__volume', 'btn'] });
    this.picture = button({ styles: ['settings__btn', 'settings__picture', 'btn'] });
    this.addChildren([this.clue, this.volume, this.picture]);
  }
}
