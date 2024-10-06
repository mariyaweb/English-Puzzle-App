import BaseElement from '../../../../ui/base-element/base-element';
import { div, input, label } from '../../../../ui/base-tags/base-tags';
import './loginInputs.css';

export default class LoginInputs extends BaseElement {
  private inputName: BaseElement;

  private inputSurname: BaseElement;

  constructor() {
    super({ tag: 'div', styles: ['loginInputs__container'] });
    this.inputName = this.createTextInput('name', 'Name');
    this.inputSurname = this.createTextInput('surname', 'Surname');
    this.addChildren([this.inputName, this.inputSurname]);
  }

  private createTextInput(labelName: string, placeholder: string): BaseElement {
    const inputContainer = div({ styles: ['loginInputs__item'] });
    const inputName = label({
      text: placeholder,
      attributes: {
        for: labelName,
      },
    });

    const inputField: BaseElement = input({
      attributes: {
        id: labelName,
        placeholder,
        type: 'text',
        name: 'name',
        required: 'true',
      },
    });

    inputContainer.addChildren([inputName, inputField]);
    return inputContainer;
  }
}
