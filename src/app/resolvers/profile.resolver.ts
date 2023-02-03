import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { PreferenceService } from '../services/preference.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {

  constructor(private userService: UserService, private preferenceService: PreferenceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin({user: this.userService.getUser(), hobbies: this.preferenceService.getAllHobbies(), regions: this.preferenceService.getAllRegions()});
  }
}
