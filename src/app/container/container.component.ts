import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { ContainerService, Post } from './container.service';
import { ModalComponent } from '../modal/modal.component';
import { Store } from '@ngrx/store';
import { AppState } from '../@ngrx/reducers';
import { isLogin } from '../@ngrx/Login-store/login-selectors';
import { AuthActions } from '../@ngrx/Login-store/login-action-type';
import { ContainerActions } from '../@ngrx/Container-store/container-action-types';
import { getAllPost } from '../@ngrx/Container-store/container-selectors';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  title = 'Jest Testing';
  posts$: Observable<any> = new Observable();
  postData$: Observable<any> = of([]);
  isLogin$: Observable<boolean> = of(false);

  constructor(
    private service: ContainerService,
    private modalService: NgbModal,
    private store: Store<AppState>) {}

  ngOnInit(): void{
    this.store.dispatch(ContainerActions.postFetchStart());
    this.posts$ = this.service.getPost();
    this.posts$.subscribe((res: Post[]) => {
      this.store.dispatch(ContainerActions.postFetchSuccessful({post: res.slice(0, 10)}));
    });
    this.isLogin$ = this.store.select(isLogin);
    this.postData$ = this.store.select(getAllPost);
  }

  open(): void{
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.closed.subscribe(post => {
      if (post.title && post.body) {
        const newPost = {
          userId: 2,
          title: post.title,
          body: post.body
        };
        this.store.dispatch(ContainerActions.saveNewPost({ newPost }));
      }
    });
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
