export default class Login {
  root: HTMLDivElement;

  header: HTMLDivElement;

  main: HTMLDivElement;

  forms: HTMLDivElement;

  constructor() {
    this.root = document.querySelector('#root') as HTMLDivElement;
    this.header = this.createHeader();
    this.main = this.createMain();
    this.forms = this.createForm();
  }

  createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    this.root.append(header);
    return header;
  }

  createMain() {
    const main = document.createElement('div');
    main.classList.add('main');
    this.root.append(main);
    return main;
  }

  createForm() {
    const forms = document.createElement('div');
    forms.classList.add('forms');
    this.root.append(forms);
    const formLoginContainer = document.createElement('div');
    formLoginContainer.classList.add('formLoginContainer');
    const formLogin = document.createElement('form');
    formLogin.action = '#';
    formLogin.classList.add('formLogin', 'form');
    formLogin.id = 'formLogin';
    forms.append(formLoginContainer);
    const formLoginHeader = document.createElement('h1');
    formLoginHeader.textContent = 'Login';
    formLoginContainer.append(formLoginHeader);
    formLoginContainer.append(formLogin);
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
    formLogin.append(inputLoginControl);
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
    formLogin.append(inputPasswordControl);
    //
    const btn = document.createElement('button');
    btn.textContent = 'Log In Now';
    btn.type = 'submit';
    formLogin.append(btn);
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
    formLogin.append(registrationContainer);

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
    return forms;
  }
}
