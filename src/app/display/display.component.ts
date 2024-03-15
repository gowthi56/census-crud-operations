import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserservService } from '../userserv.service';
import { User } from '../datas.interface';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  users: User[] = [];
  showList: boolean = false;
  showPopup: boolean = false;
  showPassword: boolean = false;
  userIdToAuthenticate: number | null = null;
  username: string = '';
  password: string = '';
  private getUsersSubscription: Subscription | undefined;
  private intervalSubscription: Subscription | undefined;
  private chunkIndex: number = 0;
  private chunkSize: number = 10;
  private totalChunks: number = 0;
  invalidUsername: boolean = false;
  invalidPassword: boolean = false;
  loginForm!: FormGroup;

  constructor(private router: Router, private serv: UserservService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.getUsers()
  }
  ngOnDestroy(): void {
    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }
  }
  
  toggleList(): void {
    if (!this.showList) {
      this.serv.getUsers().subscribe(data => {
        console.log(data);
        
        if (data && data.users) {
          const allUsers = data.users; // Store fetched data in a separate array
          const initialChunk = allUsers.slice(0, this.chunkSize); // Get the first chunk of data
          this.users = initialChunk;
          this.totalChunks = Math.ceil(allUsers.length / this.chunkSize);
          this.showList = true;
          this.startInterval(allUsers); // Start interval for chunk display
        }
      });
    } else {
      this.showList = false;
      if (this.intervalSubscription) {
        this.intervalSubscription.unsubscribe();
      }
    }
  }
  
  startInterval(allUsers: User[]): void {
    let chunkIndex = 1; 
    this.intervalSubscription = interval(5000) 
      .subscribe(() => {
        const startIndex = chunkIndex * this.chunkSize;
        const endIndex = (chunkIndex + 1) * this.chunkSize;
        const chunk = allUsers.slice(startIndex, endIndex);
        if (chunk.length > 0) {
          this.users = [...this.users, ...chunk];
          chunkIndex++;
        } else {
          if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
          }
        }
        if (chunkIndex >= this.totalChunks) {
          if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
          }
        }
      });
  }
  
  showLoginForm(userId: number): void {
    this.serv.getUser(userId).subscribe(credentials => {
      this.username = credentials.username;
      this.password = credentials.password;
      this.userIdToAuthenticate = userId;
      this.showPopup = true;
      this.invalidUsername = false;
      this.invalidPassword = false;
    });
  }

  login(): void {
    if (this.username && this.password && this.userIdToAuthenticate !== null) {
      this.serv.getUser(this.userIdToAuthenticate).subscribe(credentials => {
        if (credentials.username === this.username && credentials.password === this.password) {
          this.router.navigate(['/detail', this.userIdToAuthenticate]);
        } else {
          // Invalid username or password
          if (credentials) {
            if (credentials.username !== this.username) {
              this.invalidUsername = true;
            } else {
              this.invalidUsername = false;
            }
            if (credentials.password !== this.password) {
              this.invalidPassword = true;
            } else {
              this.invalidPassword = false;
            }
          } else {
            this.invalidUsername = false;
            this.invalidPassword = false;
            // Reset invalidUsername to false if credentials are not found
          }
      }}
      );
    } 
  }
  
  closeLoginForm(): void {
    this.showPopup = false;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
