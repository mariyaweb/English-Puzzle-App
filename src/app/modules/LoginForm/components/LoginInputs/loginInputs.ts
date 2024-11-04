import BaseElement from '../../../../ui/base-element/base-element';
import { TextError } from '../../loginForm-types';
import InputContainer from './components/input/input';
import './loginInputs.css';

export default class LoginInputs extends BaseElement {
  private inputName: InputContainer;

  private inputSurname: InputContainer;

  public submitButton: BaseElement;

  public inputNameValue: string;

  public inputSurnameValue: string;

  constructor(submitButton: BaseElement) {
    super({ tag: 'div', styles: ['loginInputs__container'] });
    this.submitButton = submitButton;
    this.inputName = new InputContainer('name', 'Name');
    this.inputSurname = new InputContainer('surname', 'Surname');
    this.inputNameValue = '';
    this.inputSurnameValue = '';
    this.addChildren([this.inputName, this.inputSurname]);
    this.addHandlers();
  }

  private addHandlers(): void {
    this.inputName.inputField.setCallback('blur', this.checkInput);
    this.inputSurname.inputField.setCallback('blur', this.checkInput);
  }

  private checkInput = (e: Event): void => {
    this.disableBtn();
    const currentInput = e.currentTarget as HTMLInputElement;
    const inputText = currentInput?.value;
    if (currentInput && currentInput.name === 'name') {
      this.inputNameValue = inputText;
      this.validateInput(inputText, this.inputName, 2);
    } else {
      this.inputSurnameValue = inputText;
      this.validateInput(inputText, this.inputSurname, 3);
    }
  };

  private validateInput(inputValue: string, input: InputContainer, minLength: number): void {
    let errText = '';
    const isEnglishLetters = this.validateEnglishLetters(inputValue);
    if (inputValue.length === 0) {
      errText = TextError.emptyField;
    } else if (!isEnglishLetters) {
      errText = TextError.noEnglishLetter;
    } else if (inputValue[0] !== inputValue[0].toUpperCase()) {
      errText = TextError.noFirstUpper;
    } else if (!(inputValue.length > minLength)) {
      errText = `${TextError.incorrectLength} ${minLength + 1}`;
    }

    if (errText.length === 0) {
      input.removeStyle('loginInputs__item--error');
    } else {
      input.addStyle('loginInputs__item--error');
    }
    input.setErrorMessage(errText);
    this.validateForm();
  }

  private validateEnglishLetters(inputText: string): boolean {
    const regex = /^[a-zA-Z-]+$/;
    return regex.test(inputText);
  }

  private validateForm(): void {
    if (
      !this.inputName.containsClass('loginInputs__item--error') &&
      !this.inputSurname.containsClass('loginInputs__item--error') &&
      this.inputNameValue !== '' &&
      this.inputSurnameValue !== ''
    ) {
      this.activeBtn();
    }
  }

  public cleanInputs(): void {
    (this.inputName.inputField.htmlTag as HTMLInputElement).value = '';
    (this.inputSurname.inputField.htmlTag as HTMLInputElement).value = '';
    this.inputNameValue = '';
    this.inputSurnameValue = '';
  }

  public disableBtn(): void {
    this.submitButton.removeStyle('loginForm__btn--active');
  }

  public activeBtn(): void {
    this.submitButton.addStyle('loginForm__btn--active');
  }
}
