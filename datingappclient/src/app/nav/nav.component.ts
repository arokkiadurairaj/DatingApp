import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loginmodel:any={};
 
  
  constructor(public accountService :AccountService) { }

  
  ngOnInit(): void {
   
  }

  login():void{
    console.log(this.loginmodel);
    this.accountService.login(this.loginmodel).subscribe(response => {
        console.log(response);       
    });
  }

  logout() : void{
    console.log("User Logged out");
    
    this.accountService.logout();
  }

  


}
