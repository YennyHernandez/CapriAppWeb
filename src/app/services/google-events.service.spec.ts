import { TestBed } from '@angular/core/testing';

import { GoogleEventsService } from './google-events.service';

describe('GoogleEventsService', () => {
  let service: GoogleEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
