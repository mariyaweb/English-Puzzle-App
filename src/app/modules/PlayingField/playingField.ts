import { getLevelInfo, getRoundInfo } from '../../api/getGameInfo';
import { IRound, IWord } from '../../api/getGameInfo-types';
import { BASE_IMG_LINK } from '../../const/const';
import BaseElement from '../../ui/base-element/base-element';
import CheckBtns from './components/CheckBtns/checkBtns';
import FieldHeader from './components/FieldHeader/fieldHeader';
import HintSentence from './components/HintSentence/hintSentence';
import Puzzle from './components/Puzzles/puzzles';
import TasksList from './components/TasksList/tasksList';
import { ShortLevelData } from './playingField-types';
import './playingField.css';

const NUMBER_OF_LEVELS = 6;

export default class PlayingField extends BaseElement {
  private title: FieldHeader;

  public sentence: HintSentence;

  public tasks: TasksList;

  public puzzle: Puzzle;

  private checkBtns: CheckBtns;

  private currentLevel: number;

  private currentRound: number;

  private currentTask: number;

  private taskList: IWord[];

  public roundData: ShortLevelData;

  private maxRound: number;

  constructor() {
    super({ styles: ['game__field', 'field'] });
    this.currentLevel = 1;
    this.currentRound = 0;
    this.currentTask = 0;
    this.maxRound = 50;
    this.title = new FieldHeader();
    this.sentence = new HintSentence();
    this.checkBtns = new CheckBtns();
    this.tasks = new TasksList(this.checkBtns);
    this.puzzle = new Puzzle(this.tasks);
    this.addChildren([this.title, this.sentence, this.tasks, this.puzzle, this.checkBtns]);
    this.createRound();
    this.taskList = [];
    this.roundData = { name: '', cutSrc: '', author: '', year: '' };
    this.addHandlers();
  }

  private addHandlers(): void {
    this.checkBtns.check.setCallback('click', this.checkSentence);
    this.checkBtns.complete.setCallback('click', this.autoCompletePuzzle);
    this.checkBtns.continue.setCallback('click', this.continue);
    this.checkBtns.nextRound.setCallback('click', this.goNextRound);
  }

  private checkSentence = (): void => {
    this.tasks.currentTaskRows[this.currentTask].checkFillRow();
  };

  private autoCompletePuzzle = (): void => {
    const currentTask = this.tasks.currentTaskRows[this.currentTask];
    currentTask.autoCompleteRow(this.puzzle);
    this.checkBtns.showContinueBtn();
  };

  private async createRound(): Promise<IRound> {
    const res = await getRoundInfo(this.currentLevel, this.currentRound);
    this.maxRound = (await getLevelInfo(this.currentLevel)).rounds.length - 1;
    this.setGame(res);
    this.setTask();
    return res;
  }

  private setGame(gameInfo: IRound): void {
    const data = gameInfo.levelData;
    this.title.setText(`${this.currentLevel}`, `${data.name}`, `${this.currentRound + 1}`);
    this.taskList = gameInfo.words;
    this.tasks.setTaskList(this.taskList);
    this.roundData = { ...this.roundData, ...data };
  }

  private setTask(): void {
    this.tasks.addTaskRow(this.currentTask);
    this.sentence.setText(`${this.taskList[this.currentTask].textExampleTranslate}`);
    this.sentence.setAudio(`${this.taskList[this.currentTask].audioExample}`);
    this.puzzle.createPuzzles(
      `${BASE_IMG_LINK + this.roundData.cutSrc}`,
      `${this.taskList[this.currentTask].textExample}`,
      this.currentTask,
    );
  }

  public update = (level: number, round: number): void => {
    this.cleanPreviousRound();
    this.currentLevel = level;
    this.currentRound = round;
    this.createRound();
  };

  public goNextRound = (): void => {
    const isLastLevel = this.currentLevel === NUMBER_OF_LEVELS;
    const isLastRound = this.currentRound === this.maxRound;
    if (isLastRound && isLastLevel) {
      this.currentLevel = 1;
      this.currentRound = 0;
    } else if (isLastRound && !isLastLevel) {
      this.currentLevel += 1;
      this.currentRound = 0;
    } else {
      this.currentRound += 1;
    }
    this.currentTask = 0;
    this.update(this.currentLevel, this.currentRound);
  };

  private cleanPreviousRound(): void {
    this.tasks.removeTaskList();
    this.tasks.removeStyle('fade-out');
    this.tasks.removeAttribute('style');
    this.checkBtns.showCheckBtn();
    this.currentTask = 0;
  }

  public goNextRow(): void {
    this.tasks.currentTask += 1;
    this.currentTask += 1;
    this.setTask();
  }

  private continue = (): void => {
    const currentRow = this.tasks.currentTaskRows[this.currentTask];
    currentRow.saveRow();
    if (!currentRow.htmlTag.classList.contains('row--incorrect')) {
      currentRow.addStyle('row--correct');
    }

    if (this.currentTask === 9) {
      const imgLink = `${BASE_IMG_LINK + this.roundData.cutSrc}`;
      this.tasks.showImageInfo(imgLink);
      this.puzzle.showPaintingInfo(this.roundData);
      this.tasks.addStyle('fade-out');
      this.checkBtns.showNextRoundBtn();
      currentRow.removeStyle('row--active');
    } else {
      this.checkBtns.disabledCheckBtn();
      this.goNextRow();
    }
  };
}
