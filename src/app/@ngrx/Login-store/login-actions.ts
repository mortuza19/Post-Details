import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/login/login.service';

export const ADD_USER = '[Authentication] Login Successfull';
export const REMOVE_USER = '[Authentication] Logout Successfull';

export const login = createAction(
  ADD_USER,
  props<{user: User}>()
);

export const logout = createAction(
  REMOVE_USER,
);
