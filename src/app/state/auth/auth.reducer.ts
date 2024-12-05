import { createReducer, on } from '@ngrx/store';
import { setToken, clearToken } from './auth.actions';
import { TokenData } from '@models/token-data.model';

export interface AuthState {
  token: TokenData | null;
}

export const initialAuthState: AuthState = {
  token: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(setToken, (state, { token }) => ({ ...state, token })),
  on(clearToken, (state) => ({ ...state, token: null }))
);

