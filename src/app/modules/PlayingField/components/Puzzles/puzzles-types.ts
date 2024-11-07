import OnePuzzle from './OnePuzzle/onePuzzle';

export interface GameSizeValue {
  pictureW: number;
  pictureH: number;
  puzzleH: number;
  circleOffset: number;
}

export type GameSizeKey = 941 | 940 | 820;

export interface IPuzzleInfo {
  puzzle: OnePuzzle;
  size: number;
}

export interface IPuzzleBlocks {
  task: number;
  allPuzzles: IPuzzleInfo[];
}
