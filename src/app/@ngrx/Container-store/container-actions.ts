import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/container/container.service';

export const  POST_FECTH_START = '[Post_Data] is started fetching from backend';
export const  POST_FECTH_SUCCESSFUL = '[Post_Data] is fecthed successfully';
export const  POST_FECTH_ERROR = '[Post_Data] fetching error occurred';
export const  SAVE_NEW_POST_START = '[Post_Data] saving a new post';
export const  SAVE_NEW_POST_SUCCESSFUL = '[Post_Data] new post is saved successfully';

export const postFetchStart = createAction(
  POST_FECTH_START
);

export const postFetchSuccessful = createAction(
  POST_FECTH_SUCCESSFUL,
  props<{post: Post[]}>()
);

export const postFetchError = createAction(
  POST_FECTH_ERROR,
);

export const saveNewPost = createAction(
  SAVE_NEW_POST_START,
  props<{newPost: Partial<Post>}>()
);

export const savePostSuccessful = createAction(
  SAVE_NEW_POST_SUCCESSFUL,
  props<{newSavedPost: Post}>()
);
