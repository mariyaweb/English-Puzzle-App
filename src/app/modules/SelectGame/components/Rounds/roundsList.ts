import { IRound } from '../../../../api/getGameInfo-types';
import BaseElement from '../../../../ui/base-element/base-element';
import RoundItem from './components/Item/roundItem';

import './roundsList.css';

export default class RoundsList extends BaseElement {
  constructor() {
    super({ tag: 'ul', styles: ['select__rounds', 'rounds'] });
  }

  public createRounds(allRounds: IRound[]): void {
    allRounds.forEach((item, idx) => {
      const roundItem = new RoundItem(item.levelData.cutSrc, item.words[0].textExample, idx);
      this.append(roundItem);
    });
  }
}
