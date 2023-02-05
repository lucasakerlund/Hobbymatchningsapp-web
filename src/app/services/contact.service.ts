import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { ContactInformation } from '../models/contact-information';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<any>('http://localhost:9090/api/v1/contacts/getContacts').pipe(map(array => {
      return array.map((object: any) => new Contact(
        object.userID,
        object.status,
        object.userFirstname,
        object.userLastname,
        object.username,
        new ContactInformation(
          object.contactInformation.discord,
          object.contactInformation.snapchat,
          object.contactInformation.instagram,
          object.contactInformation.facebook,
          object.contactInformation.email,
          object.contactInformation.phone
        )
      ));
    }));
  }

  accept(userId: string): Observable<any> {
    return this.http.put('http://localhost:9090/api/v1/contacts/acceptFriendRequest', userId, {responseType: 'text'});
  }

  deny(userId: string): Observable<any> {
    return this.http.put('http://localhost:9090/api/v1/contacts/denyFriendRequest', userId, {responseType: 'text'});
  }

}
