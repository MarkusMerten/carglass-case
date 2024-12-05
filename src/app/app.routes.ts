import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { inject, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListComponent } from '@components/user-list/user-list.component';
import { UserCreateComponent } from '@components/user-create/user-create.component';
import { LoginGuardService } from './guards/login-guard.service';
import { AppConstants } from '@constants/app-constants';

const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> | Promise<boolean> | boolean =>
  inject(AuthGuardService).canActivate(route, state);

const loginGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> | Promise<boolean> | boolean =>
  inject(LoginGuardService).canActivate(route, state);

export const INIT_ROUTES: Routes = [
  {
    path: `${AppConstants.LOGIN_ROUTE}`,
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: `${AppConstants.USER_LIST_ROUTE}`,
    component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: `${AppConstants.USER_CREATE_ROUTE}`,
    component: UserCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(INIT_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
