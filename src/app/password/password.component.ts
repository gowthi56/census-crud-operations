import { Component } from '@angular/core';
import { UserservService } from '../userserv.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  user:any
  userProfile:any
  constructor(private serv: UserservService){
this.serv.getUsers().subscribe(data => {
  console.log(data);
  
  this.userProfile = data.users
  console.log(this.userProfile);
  
})
  }

}
