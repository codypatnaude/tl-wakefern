import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';

import { ApiService } from '../api/api.service';
import { MockApiService } from '../../test/mocks/api.service';

describe('OrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ApiService, useClass: MockApiService},
        OrderService
      ]
    });
  });

  it('should be created', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));
});
