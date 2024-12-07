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

  public login(username: string, password: string): Observable<boolean> {
    if ((username === 'markus_merten@gmx.net' || username === 'krichter@gmx.de') && password === '123456') {
      this.initTokenData(username);
      return of(true);
    }
    return of(false);
  }

  public logout(): Promise<boolean> {
    localStorage.removeItem(this.TOKEN_KEY);
    this.store.dispatch(clearToken());
    return this.router.navigate([AppConstants.LOGIN_ROUTE]).then(() => true);
  }

  public isLoggedIn(): boolean {
    const tokenData = this.getTokenData();
    return !!(tokenData && !this.isTimeOver(tokenData));

  }

  private initTokenData(token: string): void {
    const tokenData: TokenData = new TokenData();
    tokenData.expiresAt = this.getDatePlusMinutes(2);
    tokenData.userName = token;
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
    this.store.dispatch(setToken({token: tokenData}));
  }

  public getTokenData(): TokenData | null {
    const tokenData = localStorage.getItem(this.TOKEN_KEY);
    return tokenData ? JSON.parse(tokenData) : null;
  }

  public loadTokenFromStorage(): void {
    // Token aus LocalStorage laden und in den Store dispatchen
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.store.dispatch(setToken({token: JSON.parse(token)}));
    }
  }

  private getDatePlusMinutes(min: number): Date {
    const time: number = new Date().getTime() + (min * 60 * 1000);
    return new Date(time);
  }

  private isTimeOver(tokenData: TokenData): boolean {
    const currentDate: Date = new Date();
    return tokenData.expiresAt ? currentDate.getTime() > new Date(tokenData.expiresAt).getTime() : false;
  }
}
