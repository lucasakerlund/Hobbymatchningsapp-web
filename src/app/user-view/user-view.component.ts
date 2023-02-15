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

  user!: User;
  status!: string;
  messageToFriend!: string;
  isBlocked!: boolean;

  // When a user is selected, we must also assign true or false to this boolean to tell that to the page - friends display more information
  isFriend!: boolean;

  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private userService: UserService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data['data']['userData'];
    this.status = this.route.snapshot.data['data']['statusData'];

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
    this.contactService.sendRequest(this.user.userId).subscribe(data => {
      this.toastService.show(`Skicka vänförfrågan till: ${this.user.firstName + ' ' + this.user.surname}.`, {classname: 'bg-success text-light', delay: 3000});
    });
  }

  blockUser(): void {
    this.contactService.blockUser(this.user.userId).subscribe(data => {
      this.toastService.show(`Blockerade användare: ${this.user.firstName + ' ' + this.user.surname}.`, {classname: 'bg-success text-light', delay: 3000});
    });
  }

  unblockUser(): void {
    this.contactService.unblockUser(this.user.userId).subscribe(data => {
      this.toastService.show(`Blockerade användare: ${this.user.firstName + ' ' + this.user.surname}.`, {classname: 'bg-success text-light', delay: 3000});
    });
  }

  removeFriend(): void {
    this.contactService.unfriend(this.user.userId).subscribe(data => {
      this.toastService.show(`Tog bort användare: ${this.user.firstName + ' ' + this.user.surname}.`, {classname: 'bg-success text-light', delay: 3000});
      this.isFriend = false;
    });
  }

  sendMesasgeToFriend(content: string): void {
    this.userService.sendMessage(this.user.userId, content).subscribe(data => console.log(data));
  }

}