import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  myForm!: FormGroup;
  showCard:boolean = false
  showForm:boolean = true
  name!:string
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      field1: ['', Validators.required],
      field2: ['', Validators.required],
      field3: ['', Validators.required],
      field4: ['', Validators.required],
      field5: ['', Validators.required],
      field6: ['', Validators.required],
      field7: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
       this.name = `${this.myForm.value.field1} ${this.myForm.value.field2}`
      this.showCard = true
      this.showForm = false
    } else {
      console.log("Form is invalid");
    }
  }
  closebtn()
  {
this.showCard = false
this.showForm = true
this.myForm.reset();
  }
}
