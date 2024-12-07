import {Component, inject, Signal} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from '@state/auth/auth.selector';
import { NgIf } from '@angular/common';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AppConstants } from '@constants/app-constants';
import { TokenData } from '@models/token-data.model';
import { setLoginStatus } from '@state/user/user.actions';
import { clearToken } from '@state/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private store = inject(Store);
  public token: Signal<TokenData | null> = this.store.selectSignal(selectToken);

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Logs out the current user by clearing the authentication token and updating the login status.
   *
   * @return {void}
   */
  public logout(): void {
    const eMail = this.token()?.userName;
    if (eMail) {
      this.authService.logout().then(() => {
        this.store.dispatch(setLoginStatus({eMail: eMail, login: true}));
        this.store.dispatch(clearToken());
        this.router.navigate([AppConstants.LOGIN_ROUTE]).then();
      });
    } else {
      this.router.navigate([AppConstants.LOGIN_ROUTE]).then();
    }
  }
}
