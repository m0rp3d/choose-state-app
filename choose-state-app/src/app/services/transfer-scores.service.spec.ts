import { TestBed } from '@angular/core/testing';

import { TransferScoresService } from './transfer-scores.service';

describe('TransferScoresService', () => {
  let service: TransferScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
