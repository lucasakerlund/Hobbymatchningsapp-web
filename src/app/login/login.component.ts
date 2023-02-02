import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  login(): void {
    this.form.markAllAsTouched;
    if(!this.form.valid){
      return;
    }
    this.authService.login(this.form.controls['username'].value, this.form.controls['password'].value).subscribe(data => {
      if(typeof data != 'string') {
        return
      }
      sessionStorage.setItem('token', data);
      this.router.navigate(['/profile']);
    });
  }

}
