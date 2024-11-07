import BaseElement from '../../../../../ui/base-element/base-element';
import Puzzle from '../../Puzzles/puzzles';

export interface IColumn {
  number: number;
  column: BaseElement;
  puzzle: BaseElement | null | Element | Puzzle;
}
