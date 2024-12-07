import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AppConstants } from '@constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Check if user is logged in and redirects to user list route if logged in.
   *
   * @param {ActivatedRouteSnapshot} route - The activated route snapshot.
   * @param {RouterStateSnapshot} state - The router state snapshot.
   * @return {boolean} Whether the user can activate the route or not.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([AppConstants.USER_LIST_ROUTE]).then();
      return false;
    }
    return true;
  }
}
