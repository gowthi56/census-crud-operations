import { Component, OnInit } from '@angular/core';
import { UserservService } from '../userserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit{
  userForm!: FormGroup;
  userid!: any
  data:any 
constructor(private serv: UserservService, private formBuilder: FormBuilder){}
ngOnInit(): void {
  this.userForm = this.formBuilder.group({
    userId: ['', Validators.required]
  });
}

onSubmit() {
  const userId = this.userForm.value.userId;
  this.serv.getuserpost(userId).subscribe(data =>
    {
      console.log(data);
      
      if (data) {
        if (data.todos && data.todos.length > 0) {
      this.data = data.todos
      this.userid = userId
      console.log(this.data);
        }}
    })
}

}
