import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

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
  @Input() errorMessages!: {[key: string]: string};
  @Input() customValid: boolean = false;
  @Input() customInvalid: boolean = false;

  constructor(private formValidator: FormValidatorService) { }

  ngOnInit(): void {
  }

  getControl(): FormControl {
    return this.control as FormControl;
  }

  getErrorMessage(): string {
    return this.formValidator.getValidationMessage(this.control, this.errorMessages);
  }

}
