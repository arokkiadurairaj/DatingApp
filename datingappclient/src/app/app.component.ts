import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datingappclient';

  users:any;
  constructor(private http:HttpClient, private accountService:AccountService){

  }


  ngOnInit(): void {    
    this.setCurrentUser();
  }



  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('UserProfile'));
    this.accountService.setCurrentUser(user);
  }
}