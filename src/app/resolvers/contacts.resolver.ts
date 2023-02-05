import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsResolver implements Resolve<boolean> {

  constructor(private contactService: ContactService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.contactService.getContacts();
  }
}
