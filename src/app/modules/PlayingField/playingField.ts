import { getRoundsInfo } from '../../api/getGameInfo';
import { IRound, IWord } from '../../api/getGameInfo-types';
import { BASE_IMG_LINK } from '../../const/const';
import BaseElement from '../../ui/base-element/base-element';
import CheckBtns from './components/CheckBtns/checkBtns';
import FieldHeader from './components/FieldHeader/fieldHeader';
import HintSentence from './components/HintSentence/hintSentence';
import Puzzle from './components/Puzzles/puzzles';
import TasksList from './components/TasksList/tasksList';
import './playingField.css';

export default class PlayingField extends BaseElement {
  private title: FieldHeader;

  public sentence: HintSentence;

  private tasks: TasksList;

  public puzzle: Puzzle;

  private checkBtns: CheckBtns;

  private currentLevel: number;

  private currentRound: number;

  private currentTask: number;

  private taskList: IWord[];

  private mainImgLink: string;

  constructor() {
    super({ styles: ['game__field', 'field'] });
    this.currentLevel = 2;
    this.currentRound = 0;
    this.currentTask = 0;
    this.title = new FieldHeader();
    this.sentence = new HintSentence();
    this.checkBtns = new CheckBtns();
    this.tasks = new TasksList(this.checkBtns);
    this.puzzle = new Puzzle(this.tasks);
    this.addChildren([this.title, this.sentence, this.tasks, this.puzzle, this.checkBtns]);
    this.createRound();
    this.taskList = [];
    this.mainImgLink = '';
    this.addHandlers();
  }

  private addHandlers(): void {
    this.checkBtns.check.setCallback('click', this.checkSentence);
    this.checkBtns.complete.setCallback('click', this.autoCompletePuzzle);
  }

  private checkSentence = (): void => { };

  private autoCompletePuzzle = (): void => {
    const currentTask = this.tasks.currentTaskRows[this.currentTask];
    currentTask.autoCompleteRow(this.puzzle);
    this.checkBtns.activeCheckBtn();
  };

  private async createRound(): Promise<IRound> {
    const res = await getRoundsInfo(this.currentLevel, this.currentRound);
    this.setGame(res);
    this.setTask();
    return res;
  }

  private setGame(gameInfo: IRound): void {
    this.title.setText(`${this.currentLevel}`, `${gameInfo.levelData.name}`, `${this.currentRound + 1}`);
    this.taskList = gameInfo.words;
    this.mainImgLink = gameInfo.levelData.cutSrc;
    this.tasks.setTaskList(this.taskList);
  }

  private setTask(): void {
    this.tasks.addTaskRow(this.currentTask);
    this.sentence.setText(`${this.taskList[this.currentTask].textExampleTranslate}`);
    this.sentence.setAudio(`${this.taskList[this.currentTask].audioExample}`);
    this.puzzle.createPuzzles(
      `${BASE_IMG_LINK + this.mainImgLink}`,
      `${this.taskList[this.currentTask].textExample}`,
      this.currentTask,
    );
  }

  public update = (level: number, round: number): void => {
    this.currentLevel = level;
    this.currentRound = round;
    this.createRound();
  };

  public goNextRound(): void {
    const next = this.currentRound + 1;
    if (next <= 9) {
      this.currentRound = next;
    }
  }

  public goNextRow(): void {
    this.tasks.currentTask += 1;
  }
}
