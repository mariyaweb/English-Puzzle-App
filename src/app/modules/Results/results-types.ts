export enum StyleName {
  DONE_LIST = 'doneList',
  NO_DONE_LIST = 'noDoneList',
}

export type TitleName = {
  [key in StyleName]: string;
};
