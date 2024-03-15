import { Component, OnInit } from '@angular/core';
import { UserservService } from '../userserv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../datas.interface';

@Component({
  selector: 'app-alldetails',
  templateUrl: './alldetails.component.html',
  styleUrls: ['./alldetails.component.css']
})

export class AlldetailsComponent implements OnInit{

  userId!: number;
  user!: User;

  constructor(private serv: UserservService, private route: ActivatedRoute,private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.getUserDetails(this.userId);
    });
  }

  getUserDetails(userId: number): void {
    this.serv.getUser(userId).subscribe(user => this.user = user);
  }
  goBack()
  {
    this.router.navigateByUrl('/user');
  }
}
