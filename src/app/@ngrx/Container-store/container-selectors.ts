import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/container/container.service';

export const postData = createFeatureSelector<{post: Post[]}>('post');

export const getAllPost = createSelector(
  postData,
  (posts) =>  posts.post ? Object.values(posts.post) : posts.post
);
