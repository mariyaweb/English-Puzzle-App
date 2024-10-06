import BaseElement from '../../ui/base-element/base-element';
import { gameListBtn } from './components/GameListBtn/gameListBtn';
import SettingsList from './components/SettingsList/settingsList';
import './gameSettings.css';

export default class GameSettings extends BaseElement {
  constructor() {
    super({ styles: ['game__settings', 'settings'] });
    this.addChildren([gameListBtn, new SettingsList()]);
  }
}
