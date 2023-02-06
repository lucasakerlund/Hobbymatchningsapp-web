import { Options } from '@angular-slider/ngx-slider/options';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hobby } from '../models/hobby';
import { HobbyController } from '../models/hobby-controller';
import { Region } from '../models/region';
import { User } from '../models/user';
import { RegionController } from '../models/region-controller';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnChanges {
  optionsExpanded: boolean = true;

  regionOptionsExpanded: boolean = true;

  areValuesEdited: boolean = false;

  _selectedMinAge: number = 18;

  _selectedMaxAge: number = 100;

  set selectedMinAge(value: number) {
    this._selectedMinAge = value;
    this.calcValuesEdited();
  }

  get selectedMinAge(): number {
    return this._selectedMinAge;
  }

  set selectedMaxAge(value: number) {
    this._selectedMaxAge = value;
    this.calcValuesEdited();
  }

  get selectedMaxAge(): number {
    return this._selectedMaxAge;
  }

  ageSliderOptions: Options = {
    floor: 18,
    ceil: 100,
  };

  allHobbies: Hobby[] = [
    new Hobby(1, 'JOGGING'),
    new Hobby(2, 'MUSIK'),
    new Hobby(3, 'ANIME'),
    new Hobby(4, 'GAMING'),
    new Hobby(5, 'CRYPTOCURRENCY'),
    new Hobby(6, 'SHITPOSTING'),
    new Hobby(7, 'BINGEWATCHING'),
    new Hobby(8, 'LÄSNING'),
    new Hobby(9, 'BLOGGING'),
    new Hobby(10, 'BILAR'),
  ];

  allRegions!: Region[];

  allGenders: string[] = ['Män', 'Kvinnor', 'Icke-specifierade', 'Samtliga'];

  user!: User;

  form!: FormGroup;

  prefForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnChanges() {
    console.log('selectedMinAge changed: ', this.selectedMinAge);
  }

  ngOnInit(): void {
    
    this.user = this.route.snapshot.data['profileData']['user'];
    this.allHobbies = this.route.snapshot.data['profileData']['hobbies'];
    this.allRegions = this.route.snapshot.data['profileData']['regions'];

    this._selectedMinAge = this.user.preference.minAge;
    this._selectedMaxAge = this.user.preference.maxAge;

    this.form = new FormGroup({
      'description': new FormControl(this.user.description),
      'first-name': new FormControl(this.user.firstName, Validators.required),
      'surname': new FormControl(this.user.surname, Validators.required),
      'username': new FormControl(this.user.username, Validators.required),
      'email': new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
      ]),
      'personalRegion': new FormControl(this.user.personalRegion.id, Validators.required),
      'discord': new FormControl(this.user.discord),
      'snapchat': new FormControl(this.user.snapchat),
      'instagram': new FormControl(this.user.instagram),
      'facebook': new FormControl(this.user.facebook),
      'phoneNumber': new FormControl(this.user.phoneNumber),
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
      this.calcValuesEdited();
    });

    this.prefForm.valueChanges.subscribe((value) => {
      this.calcValuesEdited();
    });
  }

  loadUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.areValuesEdited = false;
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
      this.allRegions.filter(region => region.id == this.form.controls['personalRegion'].value)[0].name,
      this.form.controls['description'].value,
      this.form.controls['facebook'].value,
      this.form.controls['instagram'].value,
      this.form.controls['discord'].value,
      this.form.controls['snapchat'].value,
      this.form.controls['phoneNumber'].value,
      this.selectedMinAge,
      this.selectedMaxAge,
      (this.prefForm.controls['hobbies'] as FormArray).controls.filter(controller => controller.value).map(controller => this.allHobbies.filter(hobby => hobby.id == (controller as HobbyController).hobbyId)[0].name),
      (this.prefForm.controls['regions'] as FormArray).controls.filter(controller => controller.value).map(controller => this.allRegions.filter(region => region.id == (controller as RegionController).regionId)[0].name),
      this.prefForm.controls['gender'].value
    ).subscribe(data => {
      this.loadUser();
      this.toastService.show('Uppdaterade profilsidan.', {classname: 'bg-success text-light', delay: 3000});
    });
  }

  cancelEdit(): void {
    this.form.controls['description'].setValue(this.user.description);
    this.form.controls['first-name'].setValue(this.user.firstName);
    this.form.controls['surname'].setValue(this.user.surname);
    this.form.controls['username'].setValue(this.user.username);
    this.form.controls['email'].setValue(this.user.email);
    this.form.controls['personalRegion'].setValue(this.user.personalRegion.id);
    this.form.controls['phoneNumber'].setValue(this.user.phoneNumber);
    this.form.controls['discord'].setValue(this.user.discord);
    this.form.controls['snapchat'].setValue(this.user.snapchat);
    this.form.controls['instagram'].setValue(this.user.instagram);
    this.form.controls['facebook'].setValue(this.user.facebook);

    //Preferences
    this.prefForm.controls['hobbies'].setValue(this.allHobbies.map(hobby => this.user.hobbies.map (userHobby => userHobby.id).includes(hobby.id)));
    this.prefForm.controls['regions'].setValue(this.allRegions.map(region => this.user.regions.map (userRegion => userRegion.id).includes(region.id)));
    this.prefForm.controls['gender'].setValue(this.user.gender);

    this.selectedMinAge = this.user.preference.minAge;
    this.selectedMaxAge = this.user.preference.maxAge;

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
    if(!regionId) {
      return '';
    }
    return this.allRegions.filter((region) => region.id == regionId)[0].name;
  }

  calcValuesEdited(): void {
    this.areValuesEdited =
        this.form.controls['description'].value == this.user.description &&
        this.form.controls['first-name'].value == this.user.firstName &&
        this.form.controls['surname'].value == this.user.surname &&
        this.form.controls['username'].value == this.user.username &&
        this.form.controls['email'].value == this.user.email &&
        this.form.controls['personalRegion'].value == this.user.personalRegion.id &&
        this.form.controls['phoneNumber'].value == this.user.phoneNumber &&
        this.form.controls['discord'].value == this.user.discord &&
        this.form.controls['snapchat'].value == this.user.snapchat &&
        this.form.controls['instagram'].value == this.user.instagram &&
        this.form.controls['facebook'].value == this.user.facebook &&
        this.arraysHaveSameContent(this.prefForm.controls['hobbies'].value, this.allHobbies.map(hobby => this.user.hobbies.map (userHobby => userHobby.id).includes(hobby.id))) &&
        this.arraysHaveSameContent(this.prefForm.controls['regions'].value, this.allRegions.map(region => this.user.regions.map (userRegion => userRegion.id).includes(region.id))) &&
        this.prefForm.controls['gender'].value == this.user.gender &&
        this.selectedMinAge == this.user.preference.minAge &&
        this.selectedMaxAge == this.user.preference.maxAge
          ? false
          : true;
  }

  arraysHaveSameContent(arr1: any[], arr2: any[]): boolean {
    return arr1.length === arr2.length && arr1.every((value, index) => arr2[index] === value);
  }

}
