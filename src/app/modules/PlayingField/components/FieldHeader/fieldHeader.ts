import BaseElement from '../../../../ui/base-element/base-element';
import { h3 } from '../../../../ui/base-tags/base-tags';
import './fieldHeader.css';

export default class FieldHeader extends BaseElement {
  private level: BaseElement;

  private round: BaseElement;

  constructor() {
    super({ styles: ['field__header'] });
    this.level = h3({ styles: ['field__level'] });
    this.round = h3({ styles: ['field__round'] });
    this.addChildren([this.level, this.round]);
    this.setText('2', 'Italianate Landscape With Travellers', '1');
  }

  public setText(levelNumber: string, levelName: string, round: string): void {
    this.level.setTextContent(`Level ${levelNumber}: ${levelName}`);
    this.round.setTextContent(`Round: ${round}`);
  }
}
