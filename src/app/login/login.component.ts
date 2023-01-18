import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }

  login(): void {
    this.loginService.login().subscribe(data => {
      console.log('inloggad');
    });
  }

}
