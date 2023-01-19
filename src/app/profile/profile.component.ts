import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from './user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  placeholder!: User

  user!: User
  @Input('user') backendObj: User = new User; 

  constructor() {
    
   }

  ngOnInit(): void {
      this.user = {
        firstName: this.backendObj.firstName,
        surname: this.backendObj.surname,
        email: this.backendObj.email,
        username: this.backendObj.username,
        gender: this.backendObj.gender
      }
  }

}
