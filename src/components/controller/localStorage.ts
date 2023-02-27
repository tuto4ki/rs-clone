export const enum ELOCAL_STRG {
  user = 'user',
}

export function createListenerLS() {
  window.addEventListener('beforeunload', () => {
    clearLS();
  });
  window.addEventListener('onunload', () => {
    clearLS();
  });
}

export function setUserLS(user: string) {
  localStorage.setItem(ELOCAL_STRG.user, user);
}

export function getUserLS(): string | null {
  return localStorage.getItem(ELOCAL_STRG.user);
}

function clearLS() {
  localStorage.removeItem(ELOCAL_STRG.user);
}
