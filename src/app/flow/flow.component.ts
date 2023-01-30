import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  array: number[] = [1,2,3,4,5,6,7,8,9];

  constructor() { }

  ngOnInit(): void {
  }

}
