import GameSettings from '../../modules/GameSettings/gameSettings';
import PlayingField from '../../modules/PlayingField/playingField';
import BaseElement from '../../ui/base-element/base-element';
import { div } from '../../ui/base-tags/base-tags';
import './gamePage.css';

export default class GamePage extends BaseElement {
  private wrapper: BaseElement;

  public field: PlayingField;

  constructor() {
    super({ tag: 'div', styles: ['game'] });
    this.wrapper = div({ styles: ['game__wrapper', 'wrapper'] });
    this.field = new PlayingField();
    this.wrapper.addChildren([new GameSettings(), this.field]);
    this.append(this.wrapper);
  }
}
