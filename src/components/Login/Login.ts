import { elementGenerator } from '../controller/taggenerator';
import './style.css';

export default class Login {
  private _headline: HTMLParagraphElement;
  private _passwordFiled: InputField;
  private _loginFiled: InputField;

  constructor() {
    this._headline = elementGenerator.createParagraph({ className: 'headline', text: 'Login' });
    this._passwordFiled = new InputField('password', '', 'pwd', 'Password', 'Enter your password');
    this._loginFiled = new InputField('text', '', 'user-name', 'Username', 'Enter username');
  }

  setTranslation() {
    this._headline.innerText = 'iz massiva text';
    this._passwordFiled.setTranslation();
    this._loginFiled.setTranslation();
    // TODO
  }

  createForm() {
    // const root = document.querySelector('#root') as HTMLDivElement;
    const fragment = document.createDocumentFragment();
    const forms = elementGenerator.createDiv({ className: 'forms' });
    // forms.classList.add('forms');
    // root.append(forms);
    const formLoginContainer = elementGenerator.createDiv({ className: 'formLoginContainer' });
    // formLoginContainer.classList.add('formLoginContainer');
    // const formLogin = document.createElement('form');
    // formLogin.action = '#';
    // formLogin.classList.add('formLogin', 'form');
    // formLogin.id = 'formLogin';
    formLoginContainer.append(this._headline, this._passwordFiled.getInputField(), this._loginFiled.getInputField());
    fragment.append(formLoginContainer);
    forms.append(fragment);
    // const formLoginHeader = document.createElement('h1');
    // this._headline.textContent = 'Login';

    // formLoginContainer.append(formLogin);
    //
    const inputLoginControl = document.createElement('div');
    inputLoginControl.classList.add('input-control');
    const labelLogin = document.createElement('label');
    labelLogin.textContent = 'Username';
    labelLogin.htmlFor = 'login';
    const login = document.createElement('input');
    login.id = 'login';
    login.type = 'text';
    login.placeholder = 'Enter Your Username';
    const err1 = document.createElement('div');
    err1.classList.add('error');
    inputLoginControl.append(labelLogin, login, err1);
    // formLogin.append(inputLoginControl);
    //
    const inputPasswordControl = document.createElement('div');
    inputPasswordControl.classList.add('input-control');
    const labelPassword = document.createElement('label');
    labelPassword.textContent = 'Password';
    labelPassword.htmlFor = 'password';
    const password = document.createElement('input');
    password.id = 'password';
    password.type = 'password';
    password.placeholder = 'Enter Your Password';
    const err2 = document.createElement('div');
    err2.classList.add('error');
    inputPasswordControl.append(labelPassword, password, err2);
    // formLogin.append(inputPasswordControl);
    //
    const btn = document.createElement('button');
    btn.textContent = 'Log In Now';
    btn.type = 'submit';
    // formLogin.append(btn);
    //
    const registrationContainer = document.createElement('div');
    registrationContainer.classList.add('registrationContainer');
    const spanSign = document.createElement('span');
    spanSign.classList.add('spanSign');
    spanSign.textContent = 'You don`t have account?';
    const signUpLink = document.createElement('a');
    signUpLink.href = '#';
    signUpLink.textContent = 'Register Now';
    signUpLink.classList.add('registrationLink');
    registrationContainer.append(spanSign, signUpLink);
    // formLogin.append(registrationContainer);

    //
    const formRegistrationContainer = document.createElement('div');
    formRegistrationContainer.classList.add('formRegistrationContainer');
    const formRegistration = document.createElement('form');
    formRegistration.action = '#';
    formRegistration.classList.add('formRegistration', 'form');
    formRegistration.id = 'formRegistration';
    forms.append(formRegistrationContainer);
    const formRegistrationHeader = document.createElement('h1');
    formRegistrationHeader.textContent = 'Registration';
    formRegistrationContainer.append(formRegistrationHeader);
    //
    const inputNameControl = document.createElement('div');
    inputNameControl.classList.add('input-control');
    const labelUser = document.createElement('label');
    labelUser.textContent = 'Username';
    labelUser.htmlFor = 'login';
    const username = document.createElement('input');
    username.id = 'username';
    username.type = 'text';
    username.placeholder = 'Enter Your Username';
    const err3 = document.createElement('div');
    err3.classList.add('error');
    inputNameControl.append(labelUser, username, err3);
    formRegistrationContainer.append(formRegistration);
    formRegistration.append(inputNameControl);
    //
    const inputPswControl = document.createElement('div');
    inputPswControl.classList.add('input-control');
    const labelPsw = document.createElement('label');
    labelPsw.textContent = 'Password';
    labelPsw.htmlFor = 'password';
    const psw = document.createElement('input');
    psw.id = 'psw';
    psw.type = 'password';
    psw.placeholder = 'Create Your Password';
    const err4 = document.createElement('div');
    err4.classList.add('error');
    inputPswControl.append(labelPsw, psw, err4);
    formRegistration.append(inputPswControl);
    //
    const inputEmail = document.createElement('div');
    inputEmail.classList.add('input-control');
    const labelEmail = document.createElement('label');
    labelEmail.textContent = 'Email';
    labelEmail.htmlFor = 'password';
    const email = document.createElement('input');
    email.id = 'email';
    email.type = 'email';
    email.placeholder = 'Enter Your Email';
    const err5 = document.createElement('div');
    err5.classList.add('error');
    inputEmail.append(labelEmail, email, err5);
    formRegistration.append(inputEmail);
    //
    const btnReg = document.createElement('button');
    btnReg.textContent = 'Register Now';
    btnReg.type = 'submit';
    formRegistration.append(btnReg);
    //
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('loginContainer');
    const spanSign1 = document.createElement('span');
    spanSign1.classList.add('spanSign1');
    spanSign1.textContent = 'Already have an account?';
    const loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.textContent = 'Log In';
    loginLink.classList.add('registrationLink');
    loginContainer.append(spanSign1, loginLink);
    formRegistration.append(loginContainer);

    console.log('a');
    return forms;
  }
}

class InputField {
  private _inputField: HTMLInputElement;
  private _label: HTMLLabelElement;
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
  }

  getInputField() {
    const field = elementGenerator.createDiv({ className: 'input-wrap' });
    field.append(this._label, this._inputField);
    return field;
  }

  setTranslation() {
    // set translation for inputs TODO
  }
}
