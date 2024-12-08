import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenData } from '@models/token-data.model';
import { Store } from '@ngrx/store';
import { clearToken, setToken } from '@state/auth/auth.actions';
import {Router} from '@angular/router';
import {AppConstants} from '@constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  private store: Store<TokenData> = inject(Store<TokenData>);

  constructor(private router: Router) {
  }

  /**
   * Performs user login with provided username and password.
   *
   * @param {string} username The username of the user trying to log in.
   * @param {string} password The password of the user trying to log in.
   *
   * @return {Observable<boolean>} An Observable that emits true if the login is successful, false otherwise.
   */
  public login(username: string, password: string): Observable<boolean> {
    if ((username === 'markus_merten@gmx.net' || username === 'krichter@gmx.de') && password === '123456') {
      this.initTokenData(username);
      return of(true);
    }
    return of(false);
  }

  /**
   * Logs out the user by removing the token from localStorage, clearing the token in store,
   * and navigating to the login route.
   *
   * @return A Promise that resolves to a boolean value (true) indicating successful logout.
   */
  public logout(): Promise<boolean> {
    localStorage.removeItem(this.TOKEN_KEY);
    this.store.dispatch(clearToken());
    return this.router.navigate([AppConstants.LOGIN_ROUTE]).then(() => true);
  }

  /**
   * Check if the user is currently logged in based on the token data and its expiration time.
   * @return {boolean} Returns true if the user is logged in, false otherwise.
   */
  public isLoggedIn(): boolean {
    const tokenData = this.getTokenData();
    return !!(tokenData && !this.isTimeOver(tokenData));

  }

  /**
   * Initializes the token and saves it
   *
   * @param {string} token The token to initialize the data with.
   * @private
   * @return {void}
   */
  private initTokenData(token: string): void {
    const tokenData: TokenData = new TokenData();
    tokenData.expiresAt = this.getDatePlusMinutes(10);
    tokenData.userName = token;
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
    this.store.dispatch(setToken({token: tokenData}));
  }

  /**
   * Retrieves token data from local storage.
   *
   * @return {TokenData | null} The token data if found in local storage, or null if not found.
   */
  public getTokenData(): TokenData | null {
    const tokenData = localStorage.getItem(this.TOKEN_KEY);
    return tokenData ? JSON.parse(tokenData) : null;
  }

  /**
   * Loads the authentication token from localStorage and dispatches it to the store.
   *
   * @return {void}
   */
  public loadTokenFromStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.store.dispatch(setToken({token: JSON.parse(token)}));
    }
  }

  /**
   *
   * @param {number} min - The number of minutes to add to the current date and time.
   * @private
   * @return {Date} - A new Date object representing the current date and time plus the specified minutes.
   */
  private getDatePlusMinutes(min: number): Date {
    const time: number = new Date().getTime() + (min * 60 * 1000);
    return new Date(time);
  }

  /**
   * Check if the specified token has expired based on its expiration time.
   *
   * @param {TokenData} tokenData The token data containing the expiration information.
   *
   * @return {boolean} Returns true if the token has expired, false otherwise.
   */
  private isTimeOver(tokenData: TokenData): boolean {
    const currentDate: Date = new Date();
    return tokenData.expiresAt ? currentDate.getTime() > new Date(tokenData.expiresAt).getTime() : false;
  }
}
