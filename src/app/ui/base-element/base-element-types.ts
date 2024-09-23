export type ElementCallback<T = Event> = (event: T) => void;

export type ElementStyles = string[] | string;

export type ElementAttributes = {
  [name: string]: string | number;
};

export interface ElementParams {
  tag?: string;
  styles?: ElementStyles;
  attributes?: ElementAttributes;
  text?: string;
}
