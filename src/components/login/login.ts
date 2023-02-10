import { elementGenerator } from '../controller/taggenerator';
import './style.css';

export default class Login {
  private _headline: HTMLParagraphElement;
  private _passwordField: InputField;
  private _loginField: InputField;
  private _loginState: boolean;
  private _button: HTMLButtonElement;
  private _form: HTMLDivElement;
  private _spanSign: HTMLSpanElement;
  private _signToggleBtn: HTMLButtonElement;
  private _wrapp: HTMLDivElement;

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
    this._wrapp = elementGenerator.createDiv({ className: 'wrapp' });
    this._spanSign = elementGenerator.createSpan({
      className: 'spanSign',
    });
    this._signToggleBtn = elementGenerator.createButton({
      className: 'toggleBtn',
    });
    this._wrapp.append(this._spanSign, this._signToggleBtn);

    this._form = elementGenerator.createDiv({ className: 'form' });
    this._button.addEventListener('click', () => {
      const canvas = document.querySelector('canvas') as HTMLElement;
      // если залогинился тогда, или если зарегистрировался тогда.... или если продолжить без регистрации то ->
      canvas.style.visibility = 'visible';
      this._form.style.display = 'none';

      this.validateInputs();
    });
    this._signToggleBtn.addEventListener('click', () => {
      this.changeFormState();
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
    this._headline.innerText = `${this._loginState ? 'Login' : 'Registration'}`;
    this._button.innerHTML = `${this._loginState ? 'Login' : 'Registration'}`;
    this._spanSign.innerText = `${this._loginState ? "You don't have an account?" : 'Already have an account?'}`;
    this._signToggleBtn.innerText = `${this._loginState ? 'Registration' : 'Login Now'}`;
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
      this._button,
      this._wrapp
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
}
