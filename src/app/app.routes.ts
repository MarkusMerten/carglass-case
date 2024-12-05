import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from '@components/login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { inject, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListComponent } from '@components/user-list/user-list.component';
import { UserCreateComponent } from '@components/user-create/user-create.component';

const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> | Promise<boolean> | boolean =>
  inject(AuthGuardService).canActivate(route, state);

export const INIT_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: `user-list`,
    component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: `user-create`,
    component: UserCreateComponent,
    canActivate: [authGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(INIT_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
