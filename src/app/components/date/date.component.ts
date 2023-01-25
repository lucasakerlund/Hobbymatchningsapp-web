import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {

  @Input() control!: AbstractControl;
  @Input() label!: string;
  @Input() identifier!: string;
  @Input() placeholder!: string;
  @Input() minDate!: string;
  @Input() maxDate!: string;

  @Input() errorMessages!: {[key: string]: string};
  @Input() valid!: boolean | undefined;
  @Input() invalid!: boolean | undefined;

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
