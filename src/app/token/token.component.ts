import { Component } from '@angular/core';
import { UserservService } from '../userserv.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {
  userProfile: any;
  constructor(private serv: UserservService)
  {

  }
  login() {
    this.serv.login('yraigatt3', 'sRQxjPfdS').subscribe(response => {
      if (response && response.token) {
        console.log(response);
        this.serv.setToken(response.token);
        this.fetchUserProfile();
      } else {
        console.error('Login failed');
      }
    });
  }

  fetchUserProfile() {
    this.serv.fetchUserProfile().subscribe(profile => {
      console.log(profile);
      this.userProfile = profile;
      console.log(this.userProfile);
    });
  }
}
