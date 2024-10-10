import { getLevelInfo } from '../../api/getGameInfo';
import { ILevel } from '../../api/getGameInfo-types';
import EventManager from '../../event-manager/event-manager';
import nonNullable from '../../helpers/check-functions/non-nulable';
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

  private currentRound: number;

  private close: BaseElement;

  public observerManager: EventManager;

  constructor() {
    super({ styles: ['select'] });
    this.close = div({ styles: ['select__close'] });
    this.wrapper = div({ styles: ['select__wrapper'] });
    this.title = h2({ styles: ['select__title'], text: 'Select The Game' });
    this.levels = new Levels();
    this.rounds = new RoundsList();
    this.currentLevel = 1;
    this.currentRound = 0;
    this.wrapper.addChildren([this.close, this.title, this.levels, this.rounds]);
    this.addChildren([this.wrapper]);
    this.addHandlers();
    this.createGameList();
    this.observerManager = new EventManager();
  }

  private async createGameList(): Promise<ILevel> {
    const res = await getLevelInfo(this.currentLevel);
    this.rounds.createRounds(res.rounds);
    return res;
  }

  private addHandlers(): void {
    this.setCallback('click', (e) => this.closeSelectGame(e));
    this.close.setCallback('click', (e) => this.closeSelectGame(e));
    this.levels.setCallback('click', (e) => this.changeGameList(e));
    this.rounds.setCallback('click', (e) => this.changeRound(e));
  }

  private closeSelectGame(e: Event): void {
    if (e.target === this.htmlTag || e.target === this.close.htmlTag) {
      this.closeModal();
    }
  }

  private closeModal(): void {
    this.removeStyle('select--active');
    const appBody = document.querySelector('app');
    if (nonNullable(appBody)) {
      appBody.classList.remove('app--hidden');
    }
  }

  public openModal(): void {
    this.addStyle('select--active');
    const appBody = document.querySelector('app');
    if (nonNullable(appBody)) {
      appBody.classList.add('app--hidden');
    }
  }

  private changeGameList(e: Event): void {
    const btn = e.target as HTMLElement;
    this.levels.updateBtnStyles(btn);
    this.currentLevel = this.valueToNumber(btn.dataset.level);
    this.createGameList();
  }

  private changeRound(e: Event): void {
    this.closeModal();
    const roundCard = e.target as HTMLElement;
    const roundContainer = roundCard.closest('li');
    if (nonNullable(roundContainer)) {
      this.currentRound = this.valueToNumber(roundContainer.dataset.round);
    }
    this.observerManager.notify(this.currentLevel, this.currentRound);
  }

  private valueToNumber(value: string | undefined): number {
    if (nonNullable(value)) {
      return Number(value);
    }
    return 0;
  }
}
