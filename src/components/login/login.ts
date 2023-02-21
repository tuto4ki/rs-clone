import { elementGenerator } from '../controller/taggenerator';
import { login, register } from '../controller/requests';
import { responseStatus } from '../controller/const';
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

  private _canSendReg = false;
  private _errLogin: HTMLSpanElement;
  private _errPass: HTMLSpanElement;

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
      this.validateInputs();
    });

    this._signToggleBtn.addEventListener('click', () => {
      this.changeFormState();
      this._loginField.clearInputValue();
      this._passwordField.clearInputValue();
    });
    this._errLogin = elementGenerator.createSpan({ className: 'errLogin' });
    this._errPass = elementGenerator.createSpan({ className: 'errPass' });
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
      this._errLogin,
      this._passwordField.getInputField(),
      this._errPass,
      this._button,
      this._wrapp
    );

    return this._form;
  }

  private async validateInputs() {
    //
    console.log('validate');

    if (this._loginField.getInputValue() === '') {
      this._loginField.setErrorMessage();
      this._errLogin.innerText = 'Error: username field can`t be empty';
      this._canSendReg = false;
    } else {
      this._loginField.setSuccessMessage();
      this._errLogin.innerText = '';
      this._canSendReg = true;
    }

    if (this._passwordField.getInputValue() === '' || this._passwordField.getInputValue().length < 8) {
      this._passwordField.setErrorMessage();
      this._errPass.innerText = 'Error: password field can`t be empty and password must be at least 8 characters';
      this._canSendReg = false;
    } else {
      this._passwordField.setSuccessMessage();
      this._errPass.innerText = '';

      this._canSendReg = true;
    }

    if (this._canSendReg) {
      if (this._loginState) {
        await login(this._loginField.getInputValue(), this._passwordField.getInputValue()).then((res) => {
          switch (res.status) {
            case responseStatus.error:
              this.errorMsg('Wrong password');
              break;
            case responseStatus.notFound:
              this.errorMsg('User Not found');
              break;
            case responseStatus.ok:
              this.secondScene();
              break;
          }
        });
      } else {
        await register(this._loginField.getInputValue(), this._passwordField.getInputValue()).then((res) => {
          switch (res.status) {
            case responseStatus.error:
              this.errorMsg('User already exist');
              break;
            case responseStatus.created:
              this.secondScene();
              break;
          }
        });
      }
    }
  }
  private secondScene() {
    const canvas = document.querySelector('canvas') as HTMLElement;
    // если залогинился тогда, или если зарегистрировался тогда.... или если продолжить без регистрации то ->
    canvas.style.visibility = 'visible';
    this._form.style.display = 'none';
  }

  private errorMsg(message: string) {
    //todo make it preaty
    this._loginField.setErrorMessage();
    this._passwordField.setErrorMessage();
    alert(message);
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

  clearInputValue(): void {
    this._inputField.value = '';
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
