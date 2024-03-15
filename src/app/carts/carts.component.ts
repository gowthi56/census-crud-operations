import { Component, OnInit } from '@angular/core';
import { UserservService } from '../userserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  userForm!: FormGroup;
  userid!: any
  showList = false
  data: any
  images: string[] = [];
  currentIndex = 0;

  constructor(private formBuilder: FormBuilder, private serv: UserservService) { }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userId: ['', Validators.required]
    });
  }

  onSubmit() {
    const userId = this.userForm.value.userId;
    this.serv.getUserCart(userId).subscribe(
      (response) => {
        if (response) {
          if (response.carts && response.carts.length > 0) {
            this.showList = true;
            console.log(response.carts[0]);
            this.userid = response.carts[0].userId;
            this.data = response.carts[0].products;
            console.log(this.data.length);
            this.images = [];

            for (let i = 0; i < this.data.length; i++) {
              const thumbnail = this.data[i].thumbnail;
              if (typeof thumbnail === 'string') {
                this.images.push(thumbnail);
              }
}

console.log(this.images);
            
          } else {
            this.showList = false;
            this.userid = "invalid id";
          }
        }
      },
      (error) => {
        console.error("Error occurred:", error);
      }
    );
  }
 nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
