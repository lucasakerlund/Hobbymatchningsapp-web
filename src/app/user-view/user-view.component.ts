import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hobby } from '../models/hobby';
import { Preference } from '../models/preference';
import { Region } from '../models/region';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

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

  isBlocked!: boolean;

  constructor(private route: ActivatedRoute, private http: HttpClient, private userService: UserService) {

  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['data']['userData'];
    this.userId = this.user.userId;
    this.status = this.route.snapshot.data['data']['statusData'];

    console.log(this.status);
    

    if(this.status == 'FRIENDS'){
      this.isFriend = true;
    } else if(this.status == 'BLOCKED') {  // Lade till en get status == BLOCKED men det står helt plötsligt "No Status Found i frontenden... wtf?"
      this.isFriend = false;
      this.isBlocked = true;
      console.log('THIS USER IS BLOCKED :O');
    } else {
      this.isFriend = false;
    }
  }

  addFriend(): void{
    console.log('addFriend() called! :)');
    // Call backend and change friendlist status, should now be friends
  }

  blockUser(): void{
    this.userService.blockUser(this.userId).subscribe(data => console.log(data));
  }

  removeFriend(): void{
    console.log('removeFriend() called! :/')
  }


}