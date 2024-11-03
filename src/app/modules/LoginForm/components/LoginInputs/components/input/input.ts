import BaseElement from '../../../../../../ui/base-element/base-element';
import { div, input, label } from '../../../../../../ui/base-tags/base-tags';

export default class InputContainer extends BaseElement {
  public label: BaseElement;

  public inputField: BaseElement;

  public errMessage: BaseElement;

  constructor(labelName: string, placeholder: string) {
    super({ styles: ['loginInputs__item'] });
    this.label = label({ text: placeholder, attributes: { for: labelName } });
    this.inputField = input({
      attributes: {
        id: labelName,
        placeholder,
        type: 'text',
        name: labelName,
        required: 'true',
      },
    });
    this.errMessage = div({ styles: ['loginInputs__error'], text: '' });
    this.addChildren([this.label, this.inputField, this.errMessage]);
  }

  public setErrorMessage(message: string): void {
    this.errMessage.setTextContent(message);
  }
}
