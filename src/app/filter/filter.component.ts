import { Component } from '@angular/core';
import { UserservService } from '../userserv.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  userProfile: any[] = [];
  hairColors: string[] = ['Strands']; 
  selectedColor: string = '';
  showForm:boolean = false
  constructor(private serv: UserservService)
  {

  }
onColorChange(e:any): void {
  const color = e.target.value;
    this.selectedColor = color;
    if (color) {
      this.filterUsersByHairColor(color);
    } else {
      this.userProfile = []; // Clear user list if no color selected
    }
  }

  filterUsersByHairColor(color: string): void {
    this.serv.getUsersByHairColor(color).subscribe((data: any) => {
        this.userProfile = data.users;
        if(this.userProfile.length)
        {

          this.showForm = true
        }
        else{
          this.showForm = false
        }
    });
  }
}
