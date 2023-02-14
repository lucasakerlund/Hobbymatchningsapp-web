import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hobby } from '../models/hobby';
import { Preference } from '../models/preference';
import { Region } from '../models/region';
import { User } from '../models/user';
<<<<<<< Updated upstream
import { UserService } from '../services/user.service';
=======
import { ContactService } from '../services/contact.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  user!: User;
  status!: string;
  messageToFriend!: string;
  

  // When a user is selected, we must also assign true or false to this boolean to tell that to the page - friends display more information
  isFriend!: boolean;

<<<<<<< Updated upstream
  isBlocked!: boolean;

  constructor(private route: ActivatedRoute, private http: HttpClient, private userService: UserService) {
=======
  constructor(private route: ActivatedRoute, private contactService: ContactService) {
>>>>>>> Stashed changes

  }

  ngOnInit(): void {
    console.log('This is your token, sir: ');
    console.log(sessionStorage);
    
    

    this.user = this.route.snapshot.data['data']['userData'];
    this.userId = this.user.userId;
    this.status = this.route.snapshot.data['data']['statusData'];

    console.log('Status between these two users: ' + this.status);
    

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

<<<<<<< Updated upstream
  addFriend(): void {
    console.log('addFriend() called! :)');
    // Call backend and change friendlist status, should now be friends
=======
  addFriend(): void{
    this.contactService.sendRequest(this.user.userId).subscribe(data => console.log(data));
>>>>>>> Stashed changes
  }

  blockUser(): void {
    this.userService.blockUser(this.userId).subscribe(data => console.log(data));
  }

  removeFriend(): void {
    console.log('removeFriend() called! :/')
  }

  sendMesasgeToFriend(content: string): void {
    console.log('This is your message: ' + content);

    this.userService.sendMessage(this.userId, content).subscribe(data => console.log(data));
  }


}