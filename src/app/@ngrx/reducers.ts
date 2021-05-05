import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { User } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';
import { Post } from '../container/container.service';
import { ContainerActions } from './Container-store/container-action-types';
import { AuthActions } from './Login-store/login-action-type';

export interface AppState {
  user: User;
  post: Post[];
}

export const initialState: any = {};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: {
        ...state.user,
        ...action.user
      }
    };
  })
);

export const postReducer = createReducer(
  initialState,
  on(ContainerActions.postFetchSuccessful, (state, action) => {
    return {
      ...state,
      post: {
        ...state.post,
        ...action.post
      }
    };
  }),
  on(ContainerActions.savePostSuccessful, (state, action) => {
    const newID = action.newSavedPost.id;
    return {
      ...state,
      post: {
        ...state.post,
        [newID] : {...action.newSavedPost}
      }
    };
  })
);

export const reducers: ActionReducerMap<AppState> = {

  user: authReducer,
  post: postReducer,
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];

