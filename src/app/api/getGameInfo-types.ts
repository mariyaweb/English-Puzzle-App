export interface ILevel {
  rounds: IRound[];
  roundsCount: number;
}

export interface IRound {
  levelData: ILevelData;
  words: IWord[];
}

export interface ILevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface IWord {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}
