import { getLevelInfo } from '../../api/getGameInfo';
import { ILevel } from '../../api/getGameInfo-types';
import BaseElement from '../../ui/base-element/base-element';
import { div, h2 } from '../../ui/base-tags/base-tags';
import Levels from './components/Levels/levels';
import RoundsList from './components/Rounds/roundsList';
import './selectGame.css';

export default class SelectGame extends BaseElement {
  private wrapper: BaseElement;

  private title: BaseElement;

  private levels: Levels;

  private rounds: RoundsList;

  private currentLevel: number;

  private close: BaseElement;

  constructor() {
    super({ styles: ['select', 'select--active'] });
    this.close = div({ styles: ['select__close'] });
    this.wrapper = div({ styles: ['select__wrapper'] });
    this.title = h2({ styles: ['select__title'], text: 'Select The Game' });
    this.levels = new Levels();
    this.rounds = new RoundsList();
    this.currentLevel = 1;
    this.wrapper.addChildren([this.close, this.title, this.levels, this.rounds]);
    this.addChildren([this.wrapper]);
    this.createGameList();
  }

  private async createGameList(): Promise<ILevel> {
    const res = await getLevelInfo(this.currentLevel);
    this.rounds.createRounds(res.rounds);
    return res;
  }
}
