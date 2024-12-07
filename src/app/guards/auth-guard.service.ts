import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private authService: AuthService) {}

  /**
   * Checks if the user is authenticated to activate a route
   *
   * @param {ActivatedRouteSnapshot} route - The route to be activated
   * @param {RouterStateSnapshot} state - The router state
   * @return {Observable<boolean> | Promise<boolean> | boolean} - Returns an Observable, Promise, or boolean depending on the authentication status
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return of(true);
    }
    return this.authService.logout().then(() => false);
  }
}
