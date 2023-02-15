import { Component, OnInit } from '@angular/core';
import { Match } from '../models/match';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  allMatches!: Match[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMatches().subscribe(data => {
      this.allMatches = data;
      this.loadProfilePictures();
    });
    this.loadProfilePictures();
  }

  search(username: string): void {
    this.userService.getUsersByUsername(username).subscribe(data => {
      this.allMatches = data;
      this.loadProfilePictures();
    });
  }

  loadProfilePictures(): void {
    this.allMatches?.forEach(match => {
      this.userService.getAvatarImgById(match.user.userId).subscribe(data => {
        console.log('Data under');
        console.log(data);
  
        const reader = new FileReader();
        reader.readAsDataURL(data)
        reader.onload = () => {
          match.user.photo = reader.result;
          console.log('onload has happened!');
        }
      });
    });
  }

}
