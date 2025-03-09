import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = sessionStorage.getItem('auth_token');
  return token !== null && token !== '';
};

export const notAuthGuard: CanActivateFn = () => {
  const token = sessionStorage.getItem('auth_token');
  return token === null || token === '';
}