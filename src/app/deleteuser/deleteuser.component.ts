import { Component } from '@angular/core';
import { UserservService } from '../userserv.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent {
  userId!: number;
  constructor(private userService: UserservService){}
  deleteUser() {
    if (!this.userId) {
      console.error('Please enter a valid user ID');
      return;
    }

    this.userService.deleteUser(this.userId).subscribe(
      (response) => {
        console.log(response); // Log the response after successful deletion
      },
      (error) => {
        console.error('Error:', error); // Log any errors that occur during the request
      }
    );
  }
}
// 9659751555 6360
