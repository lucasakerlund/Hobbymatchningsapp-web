import { Options } from '@angular-slider/ngx-slider/options';
import { Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hobby } from '../models/hobby';
import { HobbyController } from '../models/hobby-controller';
import { Region } from '../models/region';
import { User } from '../models/user';
import { RegionController } from '../models/region-controller';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  optionsExpanded: boolean = true;

  regionOptionsExpanded: boolean = true;

  isValuesEdited: boolean = false;

  defaultMinAgeValue: number = 18;
  
  defaultMaxAgeValue: number = 100;

  ageSliderOptions: Options = {
    floor: 18,
    ceil: 100
  };

  allHobbies: Hobby[] = [
    new Hobby(0, 'Natur'),
    new Hobby(1, 'League of Legends'),
    new Hobby(2, 'Photoshopping'),
    new Hobby(3, 'Facebook'),
    new Hobby(4, 'Mat'),
    new Hobby(5, 'CCS Codning'),
    new Hobby(6, 'Gym'),
    new Hobby(7, 'Bilar'),
    new Hobby(8, 'Matlagning'),
    new Hobby(9, 'Boxning'),
  ];

  allRegions: Region[] = [
    new Region(0, 'testRegion1'),
    new Region(1, 'testRegion2'),
    new Region(2, 'testRegion3'),
    new Region(3, 'testRegion4'),
    new Region(4, 'testRegion5'),
    new Region(5, 'testRegion6'),
    new Region(6, 'testRegion7'),
    new Region(7, 'testRegion8'),
    new Region(8, 'testRegion9'),
    new Region(9, 'testRegion10'),
    new Region(10, 'testRegion11'),
    new Region(11, 'testRegion12'),
    new Region(12, 'testRegion13'),
    new Region(13, 'testRegion14'),
    new Region(14, 'testRegion15'),
    new Region(15, 'testRegion16'),
    new Region(16, 'testRegion17'),
    new Region(17, 'testRegion18'),
    new Region(18, 'testRegion19'),
    new Region(19, 'testRegion20')
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
    this.user.description = 'Hej! Jag heter Johnny och jag gillar Angular';
    this.user.hobbies = [
      new Hobby(0, 'Natur'),
      new Hobby(1, 'League of Legends'),
      new Hobby(2, 'Photoshopping'),
      new Hobby(3, 'Facebook'),
    ];
    this.user.regions = [
      new Region(0, 'testRegion1')
    ]

    this.form = new FormGroup({
      'description': new FormControl(this.user.description),
      'hobbies': new FormArray(this.allHobbies.map(hobby => {
        const control = new HobbyController(this.user.hobbies.map(userHobby => userHobby.id).includes(hobby.id));
        control.hobbyId = hobby.id;
        return control;
      })),
      'regions': new FormArray(this.allRegions.map(region => {
        const control = new RegionController(this.user.regions.map(userRegion => userRegion.id).includes(region.id));
        control.regionId = region.id;
        return control;
      })),
      'first-name': new FormControl(this.user.firstName, Validators.required),
      'surname': new FormControl(this.user.surname, Validators.required),
      'username': new FormControl(this.user.username, Validators.required),
      'email': new FormControl(this.user.email, [Validators.required, Validators.pattern('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')]),
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

  openRegionModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'sm', windowClass: 'region-modal' });
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
  regionsToDisplay(): Region[] {
    return this.allRegions.filter(region => {
      for (let control of (this.form.controls['regions'] as FormArray).controls) {
        if (control.value && region.id == (control as RegionController).regionId) {
          return true;
        }
      }
      return false;
    })
  }

}