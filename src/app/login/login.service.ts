import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, find, map } from 'rxjs/operators';

export interface User {
  user_id: string;
  pwd: string;
  user_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.get<User[]>('../../assets/user.json').pipe(
      map((items: User[]) => items.filter((item: User) => item.user_id === user.user_id)[0])
    );
  }
}
