import { Component, OnInit } from '@angular/core';
import { Match } from '../models/match';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  array: number[] = [1,2,3,4,5,6,7,8,9];

  allMatches!: Match[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getMatches().subscribe(data => this.allMatches = data);

  }

}
