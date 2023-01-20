import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  optionsExpanded: boolean = false;

  placeholder!: User

  user!: User
  @Input('user') backendObj: User = new User;

  constructor() {

  }

  ngOnInit(): void {
    // These are for dev purpouses, should be initialized by values from backend based on logged-in user.
    this.backendObj.firstName = 'Johnny',
    this.backendObj.surname = 'Orland',
    this.backendObj.username = 'Big mighty Orlandoh',
    this.backendObj.email = 'johnnyboi@mail.com'
    this.backendObj.gender = 'gigafurry'
    this.backendObj.description = 'Hej! Jag heter Johnny och jag gillar god salami :)'
    this.backendObj.hobbies = [
      'gay porn',
      'league of legends',
      'photoshopping',
      'facebook',
      'eat dick',
      'make bad css',
      'gym',
      'driving',
      'cooking',
      'beating people'
    ]


    this.user = {
      firstName: this.backendObj.firstName,
      surname: this.backendObj.surname,
      email: this.backendObj.email,
      username: this.backendObj.username,
      gender: this.backendObj.gender,
      description: this.backendObj.description,
      hobbies: this.backendObj.hobbies
    }
    console.log('usename: ' + this.user.username);

  }

}
