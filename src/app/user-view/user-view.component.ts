import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { ContactService } from '../services/contact.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  userId!: string;
  user!: User;
  profilePicture!: string | null | ArrayBuffer;
  status!: string;
  matchPercentage!: string;

  messageToFriend!: string;

  isBlocked!: boolean;

  // When a user is selected, we must also assign true or false to this boolean to tell that to the page - friends display more information
  isFriend!: boolean;

  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private userService: UserService,
    private toastService: ToastService) { }

  ngOnInit(): void {    
    console.log('This is your token, sir: ');
    console.log(sessionStorage);

    this.user = this.route.snapshot.data['data']['userData'];
    this.userId = this.user.userId;        
    this.status = this.route.snapshot.data['data']['statusData'];

    console.log("Under this is result, bruh");
    console.log(this.user.photo);

    // Should add users image/avatar to the page
    this.userService.getAvatarImgById(this.userId).subscribe(data => {  // No errors created BUT image does not display correctly...
      console.log('Data under');
      console.log(data);

      const reader = new FileReader();
      reader.readAsDataURL(data)
      reader.onload = () => {
        this.profilePicture = reader.result;
        console.log('onload has happened!');
      };
    })

    console.log('Status between these two users: ' + this.status);

    this.userService.getMatchingPercentage(this.userId).subscribe(data => this.matchPercentage = 'Din och ' + this.user.firstName + 's profil matchar till ' + data.percentage + '%');


    if (this.status == 'FRIENDS') {
      this.isFriend = true;
    } else if (this.status == 'BLOCKED') {  // Lade till en get status == BLOCKED men det står helt plötsligt "No Status Found i frontenden... wtf?"
      this.isFriend = false;
      this.isBlocked = true;
      console.log('THIS USER IS BLOCKED :O');
    } else {
      this.isFriend = false;
    }
  }

  addFriend(): void {
    this.contactService.sendRequest(this.user.userId).subscribe(data => {
      this.toastService.show(`Skicka vänförfrågan till: ${this.user.firstName + ' ' + this.user.surname}.`, { classname: 'bg-success text-light', delay: 3000 });
    });
  }

  blockUser(): void {
    this.contactService.blockUser(this.user.userId).subscribe(data => {
      this.toastService.show(`Blockerade användare: ${this.user.firstName + ' ' + this.user.surname}.`, { classname: 'bg-success text-light', delay: 3000 });
    });
  }

  unblockUser(): void {
    this.contactService.unblockUser(this.user.userId).subscribe(data => {
      this.toastService.show(`Blockerade användare: ${this.user.firstName + ' ' + this.user.surname}.`, {classname: 'bg-success text-light', delay: 3000});
    });
  }

  removeFriend(): void {
    this.contactService.unfriend(this.user.userId).subscribe(data => {
      this.toastService.show(`Tog bort användare: ${this.user.firstName + ' ' + this.user.surname}.`, { classname: 'bg-success text-light', delay: 3000 });
      this.isFriend = false;
    });
  }

  sendMesasgeToFriend(content: string): void {
    this.userService.sendMessage(this.user.userId, content).subscribe(data => console.log(data));
  }

}