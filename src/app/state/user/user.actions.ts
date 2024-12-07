import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';

export const addUser = createAction('[User/API] Add User', props<{ user: User }>());

export const removeUser = createAction(
  '[User/API] Remove User',
  props<{ user: User }>(),
);

export const setLoginStatus = createAction('[User/API] Mark user as logged in', props<{ eMail: string, login: boolean }>());
