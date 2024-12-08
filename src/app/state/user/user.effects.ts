import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { UserService } from '@services/user.service';
import { loadUsers, loadUserSuccess } from '@state/user/user.actions';

/**
 * Returns all users from the service (server).
 */
export const loadAllUser$ = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) =>
    actions$.pipe(
      ofType(loadUsers),
      switchMap(() => userService.getAllUser()),
      map(users => loadUserSuccess({ users })),
    ),
  { functional: true },
);
