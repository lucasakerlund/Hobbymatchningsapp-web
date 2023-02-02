import { HttpClient } from '@angular/common/http';
import { Injectable, RendererStyleFlags2 } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Preference } from '../models/preference';
import { Region } from '../models/region';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<any>('http://localhost:9090/api/v1/user/getUser').pipe(map(object => 
    { console.log(object); return new User(
      object.userFirstname,
      object.userLastName,
      object.userName,
      object.contactInformation.userEmail,
      object.birthDate,
      new Region(0, 'test'),
      object.gender,
      object.description,
      object.preferences.hobbies,
      object.preferences.region,
      new Preference(object.preferences.minAge,
        object.preferences.maxAge,
        object.preferences.gender
      ),
      object.contactInformation.userPhoneNumber,
      object.contactInformation.facebook,
      object.contactInformation.discord,
      object.contactInformation.snapchat)}));
  }

  updatePreferences(minAge: number, maxAge: number, hobbies: string[], regions: string[], preferedGender: string): Observable<string> {
    return this.http.put<string>('http://localhost:9090/api/v1/user/updatePreferences', {minAge, maxAge, hobbies, regions, preferedGender});
  }

  updateUser(userEmail: string, userFirstname: string, userLastName: string, gender: string, birthDate: string, facebook: string, instagram: string, discord: string, snapchat: string, userPhoneNumber: string): Observable<string> {
    return this.http.put<string>('http://localhost:9090/api/v1/user/updateUserInformation', {userEmail, userFirstname, userLastName, gender, birthDate, facebook, instagram, discord, snapchat});
  }

}
