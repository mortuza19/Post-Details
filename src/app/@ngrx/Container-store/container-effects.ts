import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { ContainerService } from 'src/app/container/container.service';
import { AppState } from '../reducers';
import { ContainerActions } from './container-action-types';

@Injectable({
  providedIn: 'root'
})

export class ContainerEffects {

  constructor(
    private action$: Actions,
    private containerService: ContainerService,
    private store: Store<AppState>
  ) {}

  savePost = createEffect(() => {
    return this.action$.pipe(
      ofType(ContainerActions.saveNewPost),
      mergeMap((action) => this.containerService.savePost(action.newPost)),
      map((post) => this.store.dispatch(ContainerActions.savePostSuccessful({newSavedPost: post})))
    );
  }, {dispatch: false});
}
