import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  userId!: string;
  user!: User;
  status!: string;

  // When a user is selected, we must also assign true or false to this boolean to tell that to the page - friends display more information
  isFriend!: boolean;

  constructor(private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['data']['userData'];
    this.status = this.route.snapshot.data['data']['statusData'];

    if(this.status == 'FRIENDS'){
      this.isFriend = true;
    } else {
      this.isFriend = false;
    }

    // These are for dev purpouses, should be initialized by values from backend based on logged-in user.

    /*
    this.user.firstName = 'Johnny';
    this.user.surname = 'Orland';
    this.user.username = 'Big mighty Orlandoh';
    this.user.region = new Region(0, "Uziturkmännistan");
    this.user.gender = 'gigafurry';
    this.user.description = 'Hej! Jag heter Johnny och jag gillar Angular';

    this.user.preferences = new Preference(0, 0, 'Terrorist-sexual',
    [
      new Hobby(0, 'Natur'),
      new Hobby(1, 'League of Legends'),
      new Hobby(2, 'Photoshopping'),
      new Hobby(3, 'Facebook'),
    ],
    [
      new Region(0, 'testRegion1')
    ]);


    this.user.contactInformation.phoneNumber = '070-442 65 23';
    this.user.contactInformation.facebook = 'www.facebook.com/jorlandopage';
    this.user.contactInformation.discord = 'someDiscordLink#2513';
    this.user.contactInformation.snapchat = 'snapchatname29881352';
    this.user.contactInformation.email = 'johnnyboi@mail.com';

    */

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