import { TestBed } from '@angular/core/testing';

import { ApplicationFacadeService } from './application-facade.service';

describe('ApplicationFacadeService', () => {
  let service: ApplicationFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
