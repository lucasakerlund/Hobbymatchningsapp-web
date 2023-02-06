import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  optionsExpanded: boolean = true;
  
  AllContacts!: {collapsed: boolean, contact: Contact}[];
  
  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.AllContacts = this.route.snapshot.data['contactData'].map((contact: Contact) => {return {collapsed: true, contact};});
  }

  getFriendRequests(): {collapsed: boolean, contact: Contact}[]{
    return this.AllContacts.filter(contact => contact.contact.status==='PENDING');
  }

  getFriends(): {collapsed: boolean, contact: Contact}[]{
    return this.AllContacts.filter(contact => contact.contact.status==='FRIENDS');
  }

  getBlocked(): {collapsed: boolean, contact: Contact}[]{
    return this.AllContacts.filter(contact => contact.contact.status==='BLOCKED');
  }

  accept(contact: Contact): void {
    this.contactService.accept(contact.userId).subscribe(data => {
      this.toastService.show(`Accepterade vänförfrågan för ${contact.firstName + ' ' + contact.surname}.`, {classname: 'bg-success text-light', delay: 3000});
      this.loadContacts();
    });
  }

  deny(contact: Contact): void {
    this.contactService.deny(contact.userId).subscribe(data => {
      this.toastService.show(`Nekade vänförfrågan för ${contact.firstName + ' ' + contact.surname}.`, {classname: 'bg-warning text-light', delay: 3000});
      this.loadContacts();
    });
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(data => this.AllContacts = data.map(contact => {
      return {collapsed: true, contact};
    }));

  }

}
