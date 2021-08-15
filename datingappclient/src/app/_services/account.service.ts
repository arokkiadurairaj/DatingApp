import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseurl = 'http://localhost:5000/api/'

  private currentUserSource = new ReplaySubject<User>(1) ;
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseurl + 'account/login', model).pipe(
      map((response : User) => {
        const user = response;
        if(user){
          localStorage.setItem('UserProfile', JSON.stringify(user));
          this.currentUserSource.next(user);
        }

      })
    );
  }

  register(model: any){
    console.log(model);
    return this.http.post(this.baseurl + 'account/register', model).pipe(
      map((user : User) => {
        if(user){
          localStorage.setItem('UserProfile', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('UserProfile');
    this.currentUserSource.next(null);
  }
}
