import { Options } from '@angular-slider/ngx-slider/options';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hobby } from '../models/hobby';
import { HobbyController } from '../models/hobby-controller';
import { Region } from '../models/region';
import { User } from '../models/user';
import { RegionController } from '../models/region-controller';
import { Preference } from '../models/preference';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  optionsExpanded: boolean = true;

  regionOptionsExpanded: boolean = true;

  isValuesEdited: boolean = false;

  selectedAgeOne: number = 18;

  selectedAgeTwo: number = 100;

  ageSliderOptions: Options = {
    floor: 18,
    ceil: 100,
  };

  allHobbies: Hobby[] = [
    new Hobby(0, 'JOGGING'),
    new Hobby(1, 'MUSIK'),
    new Hobby(2, 'ANIME'),
    new Hobby(3, 'GAMING'),
    new Hobby(4, 'CRYPTOCURRENCY'),
    new Hobby(5, 'SHITPOSTING'),
    new Hobby(6, 'BINGEWATCHING'),
    new Hobby(7, 'LÄSNING'),
    new Hobby(8, 'BLOGGING'),
    new Hobby(9, 'BILAR'),
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
    new Region(19, 'testRegion20'),
  ];

  allGenders: string[] = ['Män', 'Kvinnor', 'Icke-specifierade', 'Samtliga'];

  user: User = new User(
    '',
    '',
    '',
    '',
    '',
    this.allRegions[0],
    '',
    '',
    [this.allHobbies[0]],
    [this.allRegions[0]],
    new Preference(0, 0, ''),
    '',
    '',
    '',
    ''
  );

  form!: FormGroup;

  prefForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.loadUser();

    this.form = new FormGroup({
      'description': new FormControl(this.user.description),
      'first-name': new FormControl(this.user.firstName, Validators.required),
      'surname': new FormControl(this.user.surname, Validators.required),
      'username': new FormControl(this.user.username, Validators.required),
      'email': new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
      ]),
      'personalRegion': new FormControl(this.user.personalRegion.id),
    });

    this.prefForm = new FormGroup({
      'hobbies': new FormArray(
        this.allHobbies.map((hobby) => {
          const control = new HobbyController(
            this.user.hobbies
              .map((userHobby) => userHobby.id)
              .includes(hobby.id)
          );
          control.hobbyId = hobby.id;
          return control;
        })
      ),
      'regions': new FormArray(
        this.allRegions.map((region) => {
          const control = new RegionController(
            this.user.regions
              .map((prefRegion) => prefRegion.id)
              .includes(region.id)
          );
          control.regionId = region.id;
          return control;
        })
      ),
      'gender': new FormControl(this.user.preference.gender),
    });

    this.form.valueChanges.subscribe((value) => {
      this.isValuesEdited =
        this.form.controls['description'].value == this.user.description &&
        this.form.controls['first-name'].value == this.user.firstName &&
        this.form.controls['surname'].value == this.user.surname &&
        this.form.controls['username'].value == this.user.username &&
        this.form.controls['email'].value == this.user.email &&
        this.form.controls['personalRegion'].value ==
          this.user.personalRegion.id
          ? false
          : true;
    });

    this.prefForm.valueChanges.subscribe((value) => {
      this.isValuesEdited =
        this.arraysHaveSameContent(this.prefForm.controls['hobbies'].value, this.allHobbies.map(hobby => this.user.hobbies.map (userHobby => userHobby.id).includes(hobby.id))) &&
        this.arraysHaveSameContent(this.prefForm.controls['regions'].value, this.allRegions.map(region => this.user.regions.map (userRegion => userRegion.id).includes(region.id))) &&
        this.prefForm.controls['gender'].value == this.user.gender ? false : true;
    });
  }

  loadUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  openHobbyModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'sm',
      windowClass: 'hobby-modal',
    });
  }

  openRegionModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'sm',
      windowClass: 'region-modal',
    });
  }

  openPersonalRegionModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'sm',
      windowClass: 'personal-region-modal',
    });
  }

  openGenderModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'sm',
      windowClass: 'gender-modal',
    });
  }

  saveEdit(): void {
    // Send updated info to backend when user hits "save" after editing profile information
    this.userService.updateUser(
      this.form.controls['email'].value,
      this.form.controls['first-name'].value,
      this.form.controls['surname'].value,
      this.user.gender,
      this.user.birthdate,
      '',
      '',
      '',
      '',
      ''
    ).subscribe(data => console.log(data));
    this.userService.updatePreferences(
      0,
      0,
      (this.prefForm.controls['hobbies'] as FormArray).controls.map(controller => this.allHobbies[(controller as HobbyController).hobbyId].name),
      (this.prefForm.controls['regions'] as FormArray).controls.map(controller => this.allRegions[(controller as RegionController).regionId].name),
      this.prefForm.controls['gender'].value
    ).subscribe(data => console.log(data));
  }

  cancelEdit(): void {
    this.form.controls['description'].setValue(this.user.description);
    this.form.controls['first-name'].setValue(this.user.firstName);
    this.form.controls['surname'].setValue(this.user.surname);
    this.form.controls['username'].setValue(this.user.username);
    this.form.controls['email'].setValue(this.user.email);
    this.form.controls['personalRegion'].setValue(this.user.personalRegion.id);

    //Preferences
    this.prefForm.controls['hobbies'].setValue(this.allHobbies.map(hobby => this.user.hobbies.map (userHobby => userHobby.id).includes(hobby.id)));
    this.prefForm.controls['regions'].setValue(this.allRegions.map(region => this.user.regions.map (userRegion => userRegion.id).includes(region.id)));
    this.prefForm.controls['gender'].setValue(this.user.gender);

  }

  hobbiesToDisplay(): Hobby[] {
    return this.allHobbies.filter((hobby) => {
      for (let control of (this.prefForm.controls['hobbies'] as FormArray)
        .controls) {
        if (control.value && hobby.id == (control as HobbyController).hobbyId) {
          return true;
        }
      }
      return false;
    });
  }

  getPersonalRegionName(regionId: number) {
    return this.allRegions.filter((region) => region.id == regionId)[0].name;
  }

 arraysHaveSameContent(arr1: any[], arr2: any[]): boolean {
  return arr1.length === arr2.length && arr1.every((value, index) => arr2[index] === value);
 }

}
