import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from './@ngrx/Login-store/login-actions';
import { AppState } from './@ngrx/reducers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    const userDetail = sessionStorage.getItem('user');
    if (userDetail) {
      this.store.dispatch(login({user: JSON.parse(userDetail)}));
    }
  }
}

