export enum Pages {
  start = 'start',
  login = 'login',
  game = 'game',
  error = 'error',
}

export type RoutesPage = {
  [key: string]: () => void;
};
