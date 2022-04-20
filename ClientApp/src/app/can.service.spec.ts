import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CanService } from './can.service';

describe('CanService', () => {
  let service: CanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost' },
      ]
    });
    service = TestBed.inject(CanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
