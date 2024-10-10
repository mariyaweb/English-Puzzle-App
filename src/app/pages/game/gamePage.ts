import GameSettings from '../../modules/GameSettings/gameSettings';
import PlayingField from '../../modules/PlayingField/playingField';
import SelectGame from '../../modules/SelectGame/selectGame';
import BaseElement from '../../ui/base-element/base-element';
import { div } from '../../ui/base-tags/base-tags';
import './gamePage.css';

export default class GamePage extends BaseElement {
  private wrapper: BaseElement;

  public field: PlayingField;

  public gameSettings: GameSettings;

  constructor(gamesList: SelectGame) {
    super({ tag: 'div', styles: ['game'] });
    this.wrapper = div({ styles: ['game__wrapper', 'wrapper'] });
    this.field = new PlayingField();
    this.gameSettings = new GameSettings(gamesList, this.field);
    this.wrapper.addChildren([this.gameSettings, this.field]);
    this.append(this.wrapper);
  }
}
