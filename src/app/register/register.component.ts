import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { repeat } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'first-name': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'surname': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-1]+@[a-z0-1].[a-z]+')]),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'repeat-password': new FormControl('', [Validators.required]),
      'birthdate': new FormControl('', [Validators.required]),
      'gender': new FormControl('', Validators.required),
    }, {validators: this.checkPasswords});
  }

  register(): void {
    this.validateForm();
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeat-password')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  validateForm(): boolean {
    this.form.markAllAsTouched();
    console.log(this.form.valid);
    return this.form.valid;
  }

  getControl(controlName: string): FormControl {
    return this.form.controls[controlName] as FormControl;
  }

}
