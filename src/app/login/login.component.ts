import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthActions } from '../@ngrx/Login-store/login-action-type';
import { LoginService, User } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private store: Store<any>
  ) {
    this.loginForm = this.fb.group({
      user_id: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void{}

  get userid(): any {
    return this.loginForm.get('user_id');
  }

  get pwd(): any {
    return this.loginForm.get('pwd');
  }

  onSubmit(): void {
    this.loginService.login(this.loginForm.value).subscribe((data: User) => {
      this.store.dispatch(AuthActions.login({user: data}));
      this.router.navigate(['../']);
    });
  }

}
