import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '@state/auth/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
