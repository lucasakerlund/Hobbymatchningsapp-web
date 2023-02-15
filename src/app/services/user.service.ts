import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, RendererStyleFlags2 } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Match } from '../models/match';
import { Preference } from '../models/preference';
import { Region } from '../models/region';
import { User } from '../models/user';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:9090/api/v1/user/getUser');
  }

  updateUser(userEmail: string, userFirstname: string, userLastName: string,
    gender: string, birthDate: string, userRegion: string, description: string,
    facebook: string, instagram: string, discord: string, snapchat: string, userPhoneNumber: string,
    minAge: number, maxAge: number, hobbies: string[], regions: string[], preferedGender: string): Observable<string> {
    return this.http.put<string>('http://localhost:9090/api/v1/user/updateUser', {
      userEmail, userFirstname, userLastName, gender, birthDate, userRegion, description, facebook,
      instagram, discord, snapchat, userPhoneNumber, minAge, maxAge, hobbies, regions, preferedGender
    }, {headers: this.headers})
    .pipe(catchError(error => this.handleError(error, 'Något fel inträffade vid uppdatering.')));
  }

  getMatchingPercentage(userId: string) {
    return this.http.get('http://localhost:9090/api/v1/user/getMatchPercentage/' + userId);
  }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>('http://localhost:9090/api/v1/user/getMatches');
  }
  
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>('http://localhost:9090/api/v1/user/getUserById/' + userId);
  }

  getContactStatus(userId: string): Observable<string> {
    // This will return status of logged in user and clicked user as a Stringgg    
    return this.http.get<any>('http://localhost:9090/api/v1/contacts/getFriendStatus/' + userId);
  }

  getUsersByUsername(username: string): Observable<Match[]> {
    return this.http.get<Match[]>('http://localhost:9090/api/v1/search/searchByUsername/' + username);
  }

  blockUser(userId: string) {
    console.log(userId);
    
    return this.http.put('http://localhost:9090/api/v1/contacts/blockUser', {friendID: userId})
  }

  sendMessage(userId: string, content: string) {
    return this.http.post('http://localhost:9090/api/v1/email/sendEmail', {userID: userId, content})
  }

  handleError(error: any, message: string): Observable<any> {
    this.toastService.show(message, {classname: 'bg-danger text-light', delay: 3000});
    return of(error);
  }
  sendAvatarImg(file: File): Observable<string>{

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>('http://localhost:9090/api/v1/user/uploadPicture', formData);
  }

  getAvatarImg(): Observable<Blob> {
    return this.http.get<Blob>('http://localhost:9090/api/v1/user/getPicture', { responseType: 'blob' as 'json' });
  }

}