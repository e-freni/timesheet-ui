import {TestBed} from '@angular/core/testing';

import {WorkdayService} from 'app/services/workday.service';

describe('WorkdayServiceService', () => {
  let service: WorkdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
