import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() control!: AbstractControl;
  @Input() label!: string;
  @Input() identifier!: string;
  @Input() placeholder!: string;

  constructor() { }

  ngOnInit(): void {
  }

  getControl(): FormControl {
    return this.control as FormControl;
  }

}
