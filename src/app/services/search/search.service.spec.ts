import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';

import { ApiService } from '../api/api.service';
import { MockApiService } from '../../test/mocks/api.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ApiService, useClass: MockApiService},
        SearchService
      ]
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));
});
