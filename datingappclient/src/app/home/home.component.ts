import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode:boolean = false;
  users:any = {};
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerClick(){
    this.registerMode = true;
  }

  getUsers(){
    this.http.get("http://localhost:5000/api/Users").subscribe(response =>{
      this.users = response;
    })
  }

  cancelRegister(registerMode:boolean){
    this.registerMode = registerMode;
  }
}
