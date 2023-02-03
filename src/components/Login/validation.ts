const formLogin = document.getElementById('formLogin') as HTMLFormElement;
const formRegistration = document.getElementById('formRegistration') as HTMLFormElement;
const login = document.getElementById('login') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const username = document.getElementById('username') as HTMLInputElement;
const passwordRegistration = document.getElementById('psw') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;

export default function validateForm(): void {
  const isValidEmail = (em: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(em).toLowerCase());
  };

  const setError = (element: HTMLElement, message: string) => {
    const inputControl = element.parentElement as HTMLElement;
    const errorDisplay = inputControl.querySelector('error') as HTMLElement;

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
  };

  const setSuccess = (element: HTMLElement) => {
    const inputControl = element.parentElement as HTMLElement;
    const errorDisplay = inputControl.querySelector('error') as HTMLElement;

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
  };

  function validateInputs(): void {
    const usernameValue: string = login.value.trim();
    const passwordValue: string = password.value.trim();
    const usernameRegistrationValue: string = username.value.trim();
    const passwordRegistrationValue: string = passwordRegistration.value.trim();
    const emailValue: string = email.value.trim();

    if (usernameValue === '') {
      setError(login, 'User is required');
    } else {
      setSuccess(login);
    }

    if (usernameRegistrationValue === '') {
      setError(username, 'User is required');
    } else {
      setSuccess(username);
    }

    if (emailValue === '') {
      setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
      setError(email, 'Provide a valid email address');
    } else {
      setSuccess(email);
    }

    if (passwordValue === '') {
      setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
      setError(password, 'Password must be at least 8 character.');
    } else {
      setSuccess(password);
    }

    if (passwordRegistrationValue === '') {
      setError(passwordRegistration, 'Password is required');
    } else if (passwordRegistrationValue.length < 8) {
      setError(passwordRegistration, 'Password must be at least 8 character.');
    } else {
      setSuccess(passwordRegistration);
    }
  }

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    validateInputs();
    console.log('test1');
  });

  formRegistration.addEventListener('submit', (e) => {
    e.preventDefault();

    validateInputs();
    console.log('test2');
  });
}
