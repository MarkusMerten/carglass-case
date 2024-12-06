import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenData } from '@models/token-data.model';
import { Store } from '@ngrx/store';
import { clearToken, setToken } from '@state/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  private store: Store<TokenData> = inject(Store<TokenData>);

  public login(username: string, password: string): Observable<boolean> {
    if ((username === 'markus_merten@gmx.net' || username === 'krichter@gmx.de') && password === '123456') {
      this.initTokenData(username);
      return of(true);
    }
    return of(false);
  }

  public logout(): Observable<boolean> {
    localStorage.removeItem(this.TOKEN_KEY);
    this.store.dispatch(clearToken());
    return of(true);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private initTokenData(token: string): void {
    const tokenData: TokenData = new TokenData();
    tokenData.expiresAt = new Date();
    tokenData.userName = token;
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
    this.store.dispatch(setToken({token: tokenData}));
  }

  public loadTokenFromStorage(): void {
    // Token aus LocalStorage laden und in den Store dispatchen
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.store.dispatch(setToken({token: JSON.parse(token)}));
    }
  }
}
