import BaseElement from '../../../../../ui/base-element/base-element';

export interface IColumn {
  number: number;
  column: BaseElement;
  puzzle: BaseElement | null | Element;
}
