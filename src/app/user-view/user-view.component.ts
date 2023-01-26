import { Component, Input } from '@angular/core';
import { Hobby } from '../models/hobby';
import { Preference } from '../models/preference';
import { Region } from '../models/region';
import { User } from '../models/user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  @Input('user') user: User = new User;

  // When a user is selected, we must also assign true or false to this boolean to tell that to the page - friends display more information
  isFriend!: boolean;

  constructor() { }

  ngOnInit(): void {
    // These are for dev purpouses, should be initialized by values from backend based on logged-in user.

    this.user.firstName = 'Johnny';
    this.user.surname = 'Orland';
    this.user.username = 'Big mighty Orlandoh';
    this.user.email = 'johnnyboi@mail.com';
    this.user.personalRegion = new Region(0, "Uziturkmännistan")
    this.user.gender = 'gigafurry';
    this.user.description = 'Hej! Jag heter Johnny och jag gillar Angular';
    this.user.hobbies = [
      new Hobby(0, 'Natur'),
      new Hobby(1, 'League of Legends'),
      new Hobby(2, 'Photoshopping'),
      new Hobby(3, 'Facebook'),
    ];

    this.user.regions = [
      new Region(0, 'testRegion1')
    ];

    this.user.preference = new Preference(0, 0, 'Terrorist-sexual')


    this.user.phoneNumber = '070-442 65 23';
    this.user.facebook = 'www.facebook.com/jorlandopage';
    this.user.discord = 'someDiscordLink#2513';
    this.user.snapchat = 'snapchatname29881352';

    this.isFriend = true;

    // Lucas har dåligt cs-aim...
  }

  addFriend(): void{
    console.log('addFriend() called! :)');
    // Call backend and change friendlist status, should now be friends
  }

  blockUser(): void{
    console.log('blockUser() called! :(');
    // Call backend and change friendlist status, should now be blocked
  }

  removeFriend(): void{
    console.log('removeFriend() called! :/')
  }


}