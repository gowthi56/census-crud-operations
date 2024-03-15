import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserservService } from '../userserv.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
  userForm!: FormGroup;
  constructor(private serv: UserservService, private formBuilder: FormBuilder)
  {}
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]]
    });
  }
  UpdateUser() {
    if (this.userForm.invalid) {
      return;
    }
    const formData = this.userForm.value;
    const userId = formData.id; // Extracting userId from the form data
    const { firstName, lastName, age } = formData; // Destructuring form data

    this.serv.updateUser(userId, firstName, lastName, age).subscribe(
      (response) => {
        console.log(response); // Log the response after successful update
      },
      (error) => {
        console.error('Error:', error); // Log any errors that occur during the request
      }
    );
  }
}
