import { elementGenerator } from '../controller/taggenerator';
import './style.css';

export default class Login {
  private _headline: HTMLParagraphElement;
  private _passwordField: InputField;
  private _loginField: InputField;
  private _loginState: boolean;
  private _button: HTMLButtonElement;
  private _form: HTMLDivElement;

  constructor() {
    this._loginState = true;
    this._loginField = new InputField('text', '', 'user-name', 'Username', 'Enter username');
    this._passwordField = new InputField('password', '', 'pwd', 'Password', 'Enter your password');

    this._headline = elementGenerator.createParagraph({
      className: 'headline',
    });
    this._button = elementGenerator.createButton({
      className: 'button',
    });
    this._form = elementGenerator.createDiv({ className: 'form' });
    this._button.addEventListener('click', () => {
      //
      this.validateInputs();
    });
  }

  private changeFormState() {
    this._loginState = !this._loginState;
    this.setFieldText();
  }

  // buttonPressed() {
  //   if (this._loginState) {
  //     //logging
  //   } else {
  //     //registration
  //   }
  // }

  private setFieldText() {
    this._headline.innerText = `${this._loginState ? 'Login' : 'Register'}`;
    this._button.innerHTML = `${this._loginState ? 'Login' : 'Register'}`;
  }

  setTranslation() {
    this.setFieldText();
    this._headline.innerText = 'iz massiva text';
    this._loginField.setTranslation();
    this._passwordField.setTranslation();
    // TODO
  }

  createForm(): HTMLDivElement {
    this.setFieldText();
    this._form.append(
      this._headline,
      this._loginField.getInputField(),
      this._passwordField.getInputField(),
      this._button
    );
    console.log('a');
    return this._form;
  }

  private validateInputs() {
    //
    console.log('validate');

    if (this._loginField.getInputValue() === '') {
      this._loginField.setErrorMessage();
    } else {
      this._loginField.setSuccessMessage();
    }

    if (this._passwordField.getInputValue() === '') {
      this._passwordField.setErrorMessage();
    } else if (this._passwordField.getInputValue().length < 8) {
      this._passwordField.setErrorMessage();
    } else {
      this._passwordField.setSuccessMessage();
    }
  }
}

class InputField {
  private _inputField: HTMLInputElement;
  private _label: HTMLLabelElement;
  private _field: HTMLDivElement;
  constructor(
    inputType: string,
    inputClassName: string,
    inputId: string,
    labelValue: string,
    placeholderValue: string
  ) {
    this._inputField = elementGenerator.createInput(inputType, {
      className: inputClassName,
      placeholder: placeholderValue,
      id: inputId,
    });
    this._label = elementGenerator.createLabel({ for: inputId, text: labelValue });
    this._field = elementGenerator.createDiv({ className: 'input-wrap' });
  }

  getInputField(): HTMLDivElement {
    this._field.append(this._label, this._inputField);
    return this._field;
  }

  getInputValue(): string {
    return this._inputField.value;
  }

  setErrorMessage() {
    this._inputField.classList.add('error');
    this._inputField.classList.remove('success');
  }

  setSuccessMessage() {
    this._inputField.classList.remove('error');
    this._inputField.classList.add('success');
  }

  setTranslation() {
    // set translation for inputs TODO
  }

  // validateInputs(): void {
  //   //
  //   if (this._inputField.value === '') {
  //     this.setErrorMessage();
  //   } else {
  //     this.setSuccessMessage();
  //   }
  // }
}
