import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() usersFromHome :any = {};
  @Output() cancelRegister = new EventEmitter();
  model:any = {};
  constructor(public accountService : AccountService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
    this.accountService.register(this.model).subscribe(response =>{
      console.log(response);
      this.cancel();
    });
  }

  cancel(){
    console.log('Cancel button clicked');
    this.cancelRegister.emit(false);
  }

}
