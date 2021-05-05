import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
@Injectable({
  providedIn: 'root',
})
export class ContainerService {

  constructor(private http: HttpClient){
  }

  getPost(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  savePost(body: any): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', body, {
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
  }
}
