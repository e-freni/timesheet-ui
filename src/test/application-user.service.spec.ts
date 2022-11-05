import { TestBed } from '@angular/core/testing';

import { ApplicationUserService } from 'app/services/rest/application-user.service';

describe('ApplicationUserService', () => {
  let service: ApplicationUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
