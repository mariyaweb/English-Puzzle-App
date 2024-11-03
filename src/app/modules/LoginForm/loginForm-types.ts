export interface IInputData {
  name: string;
  label: string;
  placeholder: string;
  validator: (value: string) => void;
}

export enum TextError {
  emptyField = 'Input field to be filled in',
  noEnglishLetter = `Only English alphabet letters and the hyphen symbol ('-') are allowed.`,
  noFirstUpper = 'The first letter must be capitalized.',
  incorrectLength = 'Minimum character length',
}
