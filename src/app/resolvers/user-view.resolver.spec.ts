import { TestBed } from '@angular/core/testing';

import { UserViewResolver } from './user-view.resolver';

describe('UserViewResolver', () => {
  let resolver: UserViewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserViewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
