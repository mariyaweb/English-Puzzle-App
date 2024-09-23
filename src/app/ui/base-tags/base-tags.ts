import BaseElement from '../base-element/base-element';
import { ElementParams } from '../base-element/base-element-types';

export const div = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLDivElement>({ tag: 'div', ...params }, ...children);

export const span = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLSpanElement>({ tag: 'span', ...params }, ...children);

export const header = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'header', ...params }, ...children);

export const main = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'main', ...params }, ...children);

export const footer = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'footer', ...params }, ...children);

export const h1 = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLElementTagNameMap['h1']>(
    { tag: 'h1', styles: ['h1'], ...params },
    ...children,
  );

export const h2 = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLElementTagNameMap['h2']>(
    { tag: 'h2', styles: ['h2'], ...params },
    ...children,
  );

export const h3 = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLElementTagNameMap['h3']>(
    { tag: 'h3', styles: ['h3'], ...params },
    ...children,
  );
export const h4 = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLElementTagNameMap['h4']>(
    { tag: 'h4', styles: ['h4'], ...params },
    ...children,
  );

export const p = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLElementTagNameMap['p']>(
    { tag: 'p', styles: ['p'], ...params },
    ...children,
  );

export const ul = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLUListElement>({ tag: 'ul', ...params }, ...children);

export const li = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement<HTMLLIElement>({ tag: 'li', ...params }, ...children);

export const button = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement(
    { tag: 'button', styles: ['button'], ...params },
    ...children,
  );

export const input = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'input', styles: ['input'], ...params }, ...children);

export const checkbox = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement(
    {
      tag: 'input',
      styles: ['checkbox'],
      attributes: { type: 'checkbox' },
      ...params,
    },
    ...children,
  );

export const img = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'img', ...params }, ...children);

export const form = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'form', ...params }, ...children);

export const label = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'label', ...params }, ...children);

export const select = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'select', ...params }, ...children);

export const option = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'option', ...params }, ...children);

export const a = (params?: ElementParams, ...children: BaseElement[]) =>
  new BaseElement({ tag: 'a', styles: ['link'], ...params }, ...children);
