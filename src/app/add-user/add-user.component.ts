import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserservService } from '../userserv.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
constructor(private serv: UserservService, private formBuilder: FormBuilder)
{}
ngOnInit(): void {
  this.userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [null, [Validators.required, Validators.min(0)]]
  });
}
addUser() {
  if (this.userForm.invalid) {
    return;
  }

  const formData = this.userForm.value;
  this.serv.addUser(formData.firstName, formData.lastName, formData.age).subscribe(
    (response) => {
      console.log(response); // Log the response to see the newly created user with a new id
      this.userForm.reset(); // Reset the form after successful submission
    },
    (error) => {
      console.error('Error:', error); // Log any errors that occur during the request
    }
  );
}
}
