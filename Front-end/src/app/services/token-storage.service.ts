import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

const USER_NAME = 'auth-name';
const USER_ID = 'auth-id';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  userID(user_id: any): void {
    window.sessionStorage.setItem(USER_ID, user_id);
  }

  public getID(): any {
    const user_id = window.sessionStorage.getItem(USER_ID);
    if (user_id) {
      return user_id;
    }
    return {};
  }

  saveName(user_name: any): void {
    window.sessionStorage.setItem(USER_NAME, user_name);
  }

  public getName(): any {
    const user_name = window.sessionStorage.getItem(USER_NAME);
    if (user_name) {
      return user_name;
    }
    return {};
  }

  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }
    return {};
  }
}
