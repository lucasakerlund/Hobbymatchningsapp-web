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
    return this.http.get<Contact[]>('http://localhost:9090/api/v1/contacts/getContacts');
  }

  accept(userId: string): Observable<any> {
    return this.http.put('http://localhost:9090/api/v1/contacts/acceptFriendRequest', userId, {responseType: 'text'});
  }

  deny(userId: string): Observable<any> {
    return this.http.delete('http://localhost:9090/api/v1/contacts/rejectFriendRequest', {
    responseType: 'text',
    body: userId});
  }

  sendRequest(userId: string): Observable<string> {
    return this.http.post<string>('http://localhost:9090/api/v1/contacts/sendFriendRequest', {friendID: userId});
  }

}
