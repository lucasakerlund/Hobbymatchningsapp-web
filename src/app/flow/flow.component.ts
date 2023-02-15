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
    this.userService.getMatches().subscribe(data => this.allMatches = data);
  }

  search(username: string): void {
    this.userService.getUsersByUsername(username).subscribe(data => {this.allMatches = data; console.log(data);});
  }

}
