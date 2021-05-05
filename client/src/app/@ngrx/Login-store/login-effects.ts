import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './login-action-type';

@Injectable({
  providedIn: 'root'
})

export class LoginEffect {
  constructor(private action$: Actions, private router: Router){}

  loginEffect = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.login),
      tap(action => {
        sessionStorage.setItem('user', JSON.stringify(action.user));
        console.log(action);
      })
    );
  }, {dispatch: false});

  logoutEffect = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.logout),
      tap(user => {
        sessionStorage.removeItem('user');
        this.router.navigate(['/login']);
      })
    );
  }, {dispatch: false});
}
