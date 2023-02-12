import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  searchForm!: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMatches().subscribe(data => this.allMatches = data);

    this.searchForm = new FormGroup({
      'search': new FormControl('')
    });
  }

  search(): void {
    this.userService.getUsersByUsername(this.searchForm.controls['search'].value).subscribe(data => this.allMatches = data);
  }

}
