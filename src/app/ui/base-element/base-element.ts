import { ElementAttributes, ElementCallback, ElementParams, ElementStyles } from './base-element-types';

export default class BaseElement<T extends HTMLElement = HTMLElement> {
  private childrenArr: BaseElement[] = [];

  protected element: T;

  constructor(params?: ElementParams, ...children: BaseElement[]) {
    this.element = document.createElement(params?.tag ?? 'div') as T;
    if (params) {
      this.addStyles(params.styles);
      this.setAttributes(params.attributes);
      this.setTextContent(params.text);
    }
    if (children) {
      this.addChildren(children);
    }
  }

  public addStyles(styles: ElementStyles | undefined): void {
    if (styles) {
      const cssStyles: string[] = typeof styles === 'string' ? styles.split(' ') : styles;
      cssStyles.forEach((style: string) => (style ? this.addStyle(style) : null));
    }
  }

  public addStyle(style: string): void {
    if (style) {
      this.element.classList.add(style);
    }
  }

  public removeStyle(style: string): void {
    if (style) {
      this.element.classList.remove(style);
    }
  }

  public removeStyles(styles: string[]): void {
    if (styles) {
      styles.forEach((style: string) => this.element.classList.remove(style));
    }
  }

  public toggleStyle(style: string): void {
    if (style) {
      this.element.classList.toggle(style);
    }
  }

  public setAttributes(attributes: ElementAttributes | undefined): void {
    if (attributes) {
      const attrArr: [string, string | number][] = Object.entries(attributes);
      attrArr.forEach((attr: [string, string | number]) => {
        const [key, value]: [string, string | number] = attr;
        this.element.setAttribute(key, `${value}`);
      });
    }
  }

  public setAttribute(key: string, value: string | number): void {
    this.element.setAttribute(key, `${value}`);
  }

  public getAttribute(key: string): string {
    const valueAttr = this.element.getAttribute(key);
    return valueAttr || '';
  }

  public removeAttribute(key: string): void {
    this.element.removeAttribute(key);
  }

  public setTextContent(text: string | undefined): void {
    if (typeof text === 'string') {
      this.element.innerHTML = text;
    }
  }

  public clearTextContent(): void {
    this.element.textContent = '';
  }

  public setCallback(eventType: string, callback: ElementCallback) {
    this.element.addEventListener(eventType, callback);
  }

  public removeCallback(eventType: string, callback: ElementCallback) {
    this.element.removeEventListener(eventType, callback);
  }

  public append(element: BaseElement): void {
    this.childrenArr.push(element);
    this.element.append(element.htmlTag);
  }

  public addChildren(children: BaseElement[]): void {
    children.forEach((element: BaseElement) => this.append(element));
  }

  public destroy(): void {
    this.destroyChildren();
    this.element.remove();
  }

  public destroyChildren(): void {
    this.childrenArr.forEach((element: BaseElement) => {
      element.destroy();
    });
    this.childrenArr.length = 0;
  }

  public destroyContent(): void {
    this.destroyChildren();
    this.element.innerHTML = '';
  }

  public clearContent(): void {
    this.childrenArr.length = 0;
    this.element.innerHTML = '';
  }

  public get htmlTag(): HTMLElement {
    return this.element;
  }

  public get children() {
    return this.childrenArr;
  }

  public set children(value: BaseElement[]) {
    this.childrenArr = value;
  }
}
