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
import {TokenData} from '@models/token-data.model';

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

  public logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate([AppConstants.LOGIN_ROUTE]).then();
    });
  }
}
