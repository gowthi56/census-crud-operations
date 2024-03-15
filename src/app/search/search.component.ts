import { Component } from '@angular/core';
import { UserservService } from '../userserv.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  showForm:boolean = false
  userProfile:any
  errorMessage:any

  constructor(private serv: UserservService)
  {

  }
  onSubmit(searchValue: string) {
    this.serv.searchUsers(searchValue).subscribe(data => {
      if (data.users.length > 0) {
        this.userProfile = data.users; 
        console.log(this.userProfile);
        
        this.showForm = true; // Show the form after receiving the data
        this.errorMessage = null
      } else {
        // Show error message
        this.errorMessage = "No matching users found.";
        this.showForm = false;
      }
    });
  }
}
