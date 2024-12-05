import { createSelector } from '@ngrx/store';
import { userFeature } from './user.reducer';

export const selectUserState = userFeature.selectUserState;

export const selectUsers = createSelector(
  selectUserState,
  ({ users }) => users,
);
