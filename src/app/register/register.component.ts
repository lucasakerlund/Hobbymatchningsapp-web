import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { first, repeat } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'first-name': new FormControl('', [Validators.required, Validators.maxLength(50)]),
      'surname': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'repeat-password': new FormControl('', [Validators.required]),
      'birthdate': new FormControl('', [Validators.required]),
      'gender': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
    }, {validators: this.checkPasswords});
  }

  register(): void {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      return;
    }
    const {['first-name']: firstName, surname, email, username, password, birthdate, gender, region } = this.form.getRawValue();
    console.log(this.form.getRawValue());
    this.authService.register(
      username,
      password,
      email,
      firstName,
      surname,
      gender,
      birthdate.year + '-' + birthdate.month + '-' + birthdate.day,
      region).subscribe(data => {
        sessionStorage.setItem('token', data);
    });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeat-password')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  getControl(controlName: string): FormControl {
    return this.form.controls[controlName] as FormControl;
  }

}
