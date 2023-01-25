import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  getValidationMessage(control: AbstractControl, errorMessages: {[key: string]: string}): string {
      for(let pattern in errorMessages) {
        if(control.hasError(pattern)) {
          return errorMessages[pattern];
        }
      }
      if(control.hasError('required')) {
        return 'Får inte vara tomt';
      }
      if(!control.valid) {
        return 'Något är fel';
      }
      return '';
  }

}
