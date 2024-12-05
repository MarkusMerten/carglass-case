import { createAction, props } from '@ngrx/store';
import { TokenData } from '@models/token-data.model';

export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: TokenData }>()
);

export const clearToken = createAction('[Auth] Clear Token');
