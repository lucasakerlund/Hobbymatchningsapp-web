import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @Input() control!: AbstractControl;
  @Input() label!: string;
  @Input() identifier!: string;
  @Input() values!: {[key: string]: any};

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
