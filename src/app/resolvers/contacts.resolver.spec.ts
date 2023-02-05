import { TestBed } from '@angular/core/testing';

import { ContactsResolver } from './contacts.resolver';

describe('ContactResolver', () => {
  let resolver: ContactsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ContactsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
