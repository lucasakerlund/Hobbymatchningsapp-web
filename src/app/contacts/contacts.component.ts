import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  optionsExpanded: boolean = true;
  
  AllContacts: {collapsed: boolean, contact: Contact}[] = [
    {
      collapsed: true,
      contact: new Contact(
        '0',
        'PENDING',
        'Baby',
        'Yodas',
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
    },
    {
      collapsed: true,
      contact: new Contact(
        '1',
        'PENDING',
        'Baby',
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
      )
    },
    {
      collapsed: true,
      contact: new Contact(
        '2',
        'PENDING',
        'Yoda',
        'Yoda',
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
    },
    {
      collapsed: true,
      contact: new Contact(
        '3',
        'FRIEND',
        'Gunilla',
        'Robert',
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
    },
    {
      collapsed: true,
      contact: new Contact(
        '4',
        'FRIEND',
        'Gunilla',
        'Tetris',
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
    },
    {
      collapsed: true,
      contact: new Contact(
        '5',
        'FRIEND',
        'Gunilla',
        'gORILLAZ',
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
    }
];
  
  

  constructor() { }

  ngOnInit(): void {
  }

  getFriendRequests(): {collapsed: boolean, contact: Contact}[]{
    return this.AllContacts.filter(contact => contact.contact.status==='PENDING');
  }

  getFriends(): {collapsed: boolean, contact: Contact}[]{
    return this.AllContacts.filter(contact => contact.contact.status==='FRIEND');
  }

}
