import BaseElement from '../../ui/base-element/base-element';
import PlayingField from '../PlayingField/playingField';
import SelectGame from '../SelectGame/selectGame';
import { gameListBtn } from './components/GameListBtn/gameListBtn';
import SettingsList from './components/SettingsList/settingsList';
import './gameSettings.css';

export default class GameSettings extends BaseElement {
  private gameList: SelectGame;

  private settings: SettingsList;

  private field: PlayingField;

  constructor(gamesList: SelectGame, field: PlayingField) {
    super({ styles: ['game__settings', 'settings'] });
    this.gameList = gamesList;
    this.settings = new SettingsList();
    this.field = field;
    this.addChildren([gameListBtn, this.settings]);
    this.addHandlers();
  }

  private addHandlers(): void {
    gameListBtn.setCallback('click', () => this.gameList.openModal());
    this.settings.setCallback('click', (e: Event) => {
      this.changeSettings(e);
    });
  }

  private changeSettings = (e: Event): void => {
    const btn = e.target as HTMLElement;
    const btnData = btn.dataset.setting;
    btn.classList.toggle(`settings__${btnData}--hide`);
    if (btnData === 'clue') {
      this.field.sentence.toggleTextVisibility();
    } else if (btnData === 'volume') {
      this.field.sentence.toggleVolume();
    } else {
      this.field.puzzle.toggleStyle('puzzle--hide');
    }
  };
}
