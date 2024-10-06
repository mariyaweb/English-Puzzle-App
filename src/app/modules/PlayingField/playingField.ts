import { getRoundsInfo } from '../../api/getGameInfo';
import { IRound } from '../../api/getGameInfo-types';
import BaseElement from '../../ui/base-element/base-element';
import CheckBtns from './components/CheckBtns/checkBtns';
import FieldHeader from './components/FieldHeader/fieldHeader';
import HintSentence from './components/HintSentence/hintSentence';
import Puzzle from './components/Puzzles/puzzles';
import TasksList from './components/TasksList/tasksList';
import './playingField.css';

const BASE_IMG_LINK = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/refs/heads/main/images/';

export default class PlayingField extends BaseElement {
  private title: FieldHeader;

  private sentence: HintSentence;

  private tasks: TasksList;

  private puzzle: Puzzle;

  private checkBtns: BaseElement;

  private currentLevel: number;

  private currentRound: number;

  private currentTask: number;

  constructor() {
    super({ styles: ['game__field', 'field'] });
    this.currentLevel = 2;
    this.currentRound = 0;
    this.currentTask = 1;
    this.title = new FieldHeader();
    this.sentence = new HintSentence();
    this.tasks = new TasksList();
    this.puzzle = new Puzzle();
    this.checkBtns = new CheckBtns();
    this.addChildren([this.title, this.sentence, this.tasks, this.puzzle, this.checkBtns]);
    this.createRound();
  }

  private async createRound(): Promise<IRound> {
    const res = await getRoundsInfo(this.currentLevel, this.currentRound);
    this.title.setText(`${this.currentLevel}`, `${res.levelData.name}`, `${this.currentRound}`);
    this.sentence.setText(`${res.words[this.currentRound].textExampleTranslate}`);
    this.puzzle.createPuzzles(`${BASE_IMG_LINK + res.levelData.cutSrc}`, `${res.words[this.currentRound].textExample}`);
    this.tasks.addTaskRow(res.words);
    return res;
  }

  private setGame(): void {
    // level number levelData.name
    // level name
    // round number
    // setTask
  }

  private setTask(): void {
    // set sentence  levelData.name
    // active row
    // set new puzzles
  }
}
