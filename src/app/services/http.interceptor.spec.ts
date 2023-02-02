import { TestBed } from '@angular/core/testing';

import { HttpintercepterInterceptor } from './http.interceptor';

describe('HttpintercepterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpintercepterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpintercepterInterceptor = TestBed.inject(HttpintercepterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
