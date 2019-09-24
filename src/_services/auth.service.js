import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  loginClient,
  loginCompany,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() { return currentUserSubject.value }
};

function loginClient(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };
  
  return fetch(process.env.REACT_APP_BLINK + '/login/client', requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);
      return user;
    })
}

function loginCompany(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  
  return fetch(process.env.REACT_APP_BLINK + '/login/company', requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);
      return user;
    })
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
