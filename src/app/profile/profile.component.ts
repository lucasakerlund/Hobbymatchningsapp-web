import { Options } from '@angular-slider/ngx-slider/options';
import { Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hobby } from '../models/hobby';
import { HobbyController } from '../models/hobby-controller';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  optionsExpanded: boolean = true;

  isValuesEdited: boolean = false;

  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  allHobbies: Hobby[] = [
    new Hobby(0, 'gay porn'),
    new Hobby(1, 'league of legends'),
    new Hobby(2, 'photoshopping'),
    new Hobby(3, 'facebook'),
    new Hobby(4, 'eat dick'),
    new Hobby(5, 'make bad css'),
    new Hobby(6, 'gym'),
    new Hobby(7, 'driving'),
    new Hobby(8, 'cooking'),
    new Hobby(9, 'beating people'),
  ];

  @Input('user') user: User = new User;

  form!: FormGroup;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    // These are for dev purpouses, should be initialized by values from backend based on logged-in user.
    this.user.firstName = 'Johnny';
    this.user.surname = 'Orland';
    this.user.username = 'Big mighty Orlandoh';
    this.user.email = 'johnnyboi@mail.com';
    this.user.gender = 'gigafurry';
    this.user.description = 'Hej! Jag heter Johnny och jag gillar god salami :)';
    this.user.hobbies = [
      new Hobby(0, 'gay porn'),
      new Hobby(1, 'league of legends'),
      new Hobby(2, 'photoshopping'),
      new Hobby(3, 'facebook'),
    ];

    this.form = new FormGroup({
      'description': new FormControl(this.user.description),
      'hobbies': new FormArray(this.allHobbies.map(hobby => {
        const control = new HobbyController(this.user.hobbies.map(userHobby => userHobby.id).includes(hobby.id));
        control.hobbyId = hobby.id;
        return control;
      })),
      'first-name': new FormControl(this.user.firstName, Validators.required),
      'surname': new FormControl(this.user.surname, Validators.required),
      'username': new FormControl(this.user.username, Validators.required),
      'email': new FormControl(this.user.email, [Validators.required, Validators.pattern('[a-z0-1]+@[a-z0-1].[a-z]+')]),
    });

    this.form.valueChanges.subscribe(value => {
      this.isValuesEdited =
        this.form.controls['description'].value == this.user.description &&
          this.form.controls['first-name'].value == this.user.firstName &&
          this.form.controls['surname'].value == this.user.surname &&
          this.form.controls['username'].value == this.user.username &&
          this.form.controls['email'].value == this.user.email ? false : true;
    });

  }

  openHobbyModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'sm', windowClass: 'hobby-modal' });
  }

  saveEdit(): void {
    // Send updated info to backend when user hits "save" after editing profile information
  }

  cancelEdit(): void {
    this.form.controls['description'].setValue(this.user.description);
    this.form.controls['first-name'].setValue(this.user.firstName);
    this.form.controls['surname'].setValue(this.user.surname);
    this.form.controls['username'].setValue(this.user.username);
    this.form.controls['email'].setValue(this.user.email);
  }

  hobbiesToDisplay(): Hobby[] {
    return this.allHobbies.filter(hobby => {
      for (let control of (this.form.controls['hobbies'] as FormArray).controls) {
        if (control.value && hobby.id == (control as HobbyController).hobbyId) {
          return true;
        }
      }
      return false;
    })
  }

}
