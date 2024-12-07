import { createFeature, createReducer, on } from '@ngrx/store';
import {
  addUser, setLoginStatus,
  removeUser,
} from './user.actions';
import { User } from '@models/user.model';
import { RolesModel } from '@models/roles.model';

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [
    { name: 'Karl Richter', eMail: 'krichter@gmx.de', role: RolesModel.ADMIN, loginDate: null},
    { name: 'Markus Merten', eMail: 'markus_merten@gmx.net', role: RolesModel.ADMIN, loginDate: null}],
};

export const reducer = createReducer(
  initialState,

  on(addUser, (state, { user }) => {
    const users = state.users.filter(({ eMail }) => user.eMail !== eMail).concat(user);
    return { ...state, users };
  }),

  // Remove user from users array
  on(removeUser, (state, { user }) => {
    const users = state.users.filter(({ eMail }) => user.eMail !== eMail);
    return { ...state, users };
  }),

  on(setLoginStatus, (state, { eMail, login }) => {
    const updatedUsers = state.users.map((user) =>
      user.eMail === eMail
        ? { ...user, loginDate: login ? new Date() : null}
        : user
    );

    // Neuen State zurückgeben
    return { ...state, users: updatedUsers };
  }),
);

export const userFeature = createFeature({ name: 'user', reducer });
