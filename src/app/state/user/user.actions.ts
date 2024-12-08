import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';

export const addUser = createAction('[User/API] Add User', props<{ user: User }>());

export const removeUser = createAction(
  '[User/API] Remove User',
  props<{ user: User }>(),
);

export const setLoginStatus = createAction('[User/API] Set login status for user', props<{ eMail: string, login: boolean }>());

export const loadUsers = createAction('[User/API] Load users');

export const loadUserSuccess = createAction('[User/API] Load user success', props<{users: User[]}>());
