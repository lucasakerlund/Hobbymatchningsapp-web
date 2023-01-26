import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  optionsExpanded: boolean = true;
  
  AllContacts: Contact[] = [
    new Contact(
      '0',
      'PENDING',
      'Gunilla',
      'Gunilla',
      'userName',
      {
        discord: '0',
        snapchat: '1',
        instagram: '2',
        facebook: '3',
        email: '4',
        phone: '5'
      }
    ),
    new Contact(
      '1',
      'PENDING',
      'Gunilla',
      'Person',
      'userName',
      {
        discord: '0',
        snapchat: '1',
        instagram: '2',
        facebook: '3',
        email: '4',
        phone: '5'
      }
    ),
    new Contact(
      '2',
      'PENDING',
      'Gunilla',
      'Päron',
      'userName',
      {
        discord: '0',
        snapchat: '1',
        instagram: '2',
        facebook: '3',
        email: '4',
        phone: '5'
      }
    ),
    new Contact(
      '2',
      'FRIEND',
      'Gunilla',
      'Päron',
      'userName',
      {
        discord: '0',
        snapchat: '1',
        instagram: '2',
        facebook: '3',
        email: '4',
        phone: '5'
      }
    ),
    new Contact(
      '2',
      'FRIEND',
      'Per',
      'Päron',
      'userName',
      {
        discord: '0',
        snapchat: '1',
        instagram: '2',
        facebook: '3',
        email: '4',
        phone: '5'
      }
    ),
    new Contact(
      '2',
      'FRIEND',
      'Gib',
      'Päron',
      'userName',
      {
        discord: '0',
        snapchat: '1',
        instagram: '2',
        facebook: '3',
        email: '4',
        phone: '5'
      }
    )
  ];
  
  

  constructor() { }

  ngOnInit(): void {
  }

  getFriendRequests(): Contact[]{
    return this.AllContacts.filter(contact => contact.status==='PENDING');
  }

}
